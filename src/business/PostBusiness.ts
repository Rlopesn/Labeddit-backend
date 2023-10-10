import { PostDatabase } from "../database/PostDatabase";
import { PostCreateInputDTO } from "../dtos/posts/postCreate.dto";
import { PostDeleteInputDTO } from "../dtos/posts/postDelete.dto";
import { PostGetInputDTO, PostGetOutputDTO } from "../dtos/posts/postGet.dto";
import { PostLikeDislikeInputDTO } from "../dtos/posts/postLikeDislike.dto";
import { PostUpdateInputDTO } from "../dtos/posts/postUpdate.tdo";
import { BadRequestError } from "../errors/BadRequestError";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { LikeDislikeDB, PostDB } from "../types";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public create = async (input: PostCreateInputDTO): Promise<void> => {
        const id = this.idGenerator.generate()
        const { content, token } = input

        const result = this.tokenManager.getPayload(token)

        if (!result) {
            throw new BadRequestError("Invalid token.")
        }

        const newPostDB: PostDB = {
            id,
            content,
            creator_id: result.id,
            likes: 0,
            dislikes: 0,
            comments: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await this.postDatabase.createPost(newPostDB)

    }

    public getAll = async (input: PostGetInputDTO): Promise<PostGetOutputDTO[]> => {
        const { token } = input

        const isTokenValid = this.tokenManager.getPayload(token)

        if (!isTokenValid) {
            throw new BadRequestError("Invalid token.")
        }

        const result = await this.postDatabase.findPost()
        
        const output: PostGetOutputDTO[] = result.map((post) => ({
            id: post.id,
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            created_at: post.created_at,
            updated_at: post.updated_at,
            creator: {
                id: post.userId,
                name: post.userName
            }
        }))

        return output
    }

    public update = async(input: PostUpdateInputDTO): Promise<void> =>{
        const {id, content, token} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Invalida token.")
        }

        const result = await this.postDatabase.findPostById(id)

        if(!id){
            throw new BadRequestError("'Id'not found.")
        }

        if(payload.id !== result?.creator_id){
            throw new BadRequestError("'Id'invalid.")
        }

        await this.postDatabase.updatePost(id, content)

    }

    public delete = async(input: PostDeleteInputDTO): Promise<void> =>{
        const {id, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new BadRequestError("Invalid token.")
        }

        const result = await this.postDatabase.findPostById(id)

        if(payload.id === result?.creator_id || payload.role === USER_ROLES.ADMIN){
            await this.postDatabase.deletePost(id)
        }else{
            throw new BadRequestError("Access denied.")
        }
    }


    public likeDislike = async(input: PostLikeDislikeInputDTO) =>{
        const {id: postId, like, token} = input

        const isLiked = Number(like)
        
        const payload = this.tokenManager.getPayload(token)
        
        if (payload === null) {
            throw new BadRequestError("Invalid token.")
        }
        const userId = payload.id

        const result = await this.postDatabase.findPostById(postId)

        if(typeof result === 'undefined'){
            throw new BadRequestError("Post not found.")
        }
        
        if(userId === result?.creator_id){
            throw new BadRequestError("You can't like your own post.")
        }
    
        const likeDislikeDB: LikeDislikeDB = {
            post_id: postId,
            user_id: userId,
            like: isLiked
        }
        
        const likeExist = await this.postDatabase.findLikeDislike(postId, userId)

        if(!likeExist){
            await this.postDatabase.createLikeDislike(likeDislikeDB)
            if(isLiked === 1){
                await this.postDatabase.incrementLike(postId)
            }else{
                await this.postDatabase.incrementDislike(postId)
            }
        }else{
            if(isLiked !== likeExist.like){
                await this.postDatabase.createLikeDislike(likeDislikeDB)
                if(isLiked === 1){
                    await this.postDatabase.revertDislikeToLike(postId)
                }else{
                    await this.postDatabase.revertLikeToDislike(postId)
                }
            }else{
                await this.postDatabase.deleteLikeDislike(postId, userId)

                if(isLiked === 1){
                    await this.postDatabase.decrementLike(postId)
                }else{
                    await this.postDatabase.decrementDislike(postId) 
                }
            }
            
        }
        
    }
}