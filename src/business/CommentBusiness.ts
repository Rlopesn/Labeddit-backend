import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { CommentCreateInputDTO } from "../dtos/comments/commentsCreate.dto";
import { CommentDeleteInputDTO } from "../dtos/comments/commentsDelete.dto";
import { CommentGetInputDTO, CommentsGetOutputDTO } from "../dtos/comments/commentsGet.dto";
import { CommentLikeDislikeInputDTO } from "../dtos/comments/commentsLikeDislike.dto";
import { CommentUpdateInputDTO } from "../dtos/comments/commentsUpdate.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentsDB, LikeDislikeCommentDB } from "../types";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public create = async (input: CommentCreateInputDTO): Promise<void> => {
        const id = this.idGenerator.generate()
        const {post_id, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Invalid token.")
        }
        
        const result = await this.postDatabase.findPostById(post_id)

        if(!result){
            throw new BadRequestError("Post not found.")
        }


        const newComment: CommentsDB = {
            id,
            post_id,
            creator_id: payload.id,
            content,
            like:0,
            dislike: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await this.commentDatabase.createComment(newComment)
        await this.commentDatabase.incrementeComment(post_id)
    }

    public get = async(input: CommentGetInputDTO): Promise<CommentsGetOutputDTO[]> =>{
        const {token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new BadRequestError("Invalid token.")
        }

        const result = await this.commentDatabase.findComment()

        const output: CommentsGetOutputDTO[] = result.map((comment)=>({
            id: comment.id,
            content: comment.content,
            likes: comment.like ,
            dislikes: comment.dislike ,
            created_at: comment.created_at ,
            updated_at:comment.updated_at ,
            creator: {
                id: comment.userId,
                post_id: comment.postId,
                name: comment.userName
            }
        }))

        return output
    }

    public update = async(input: CommentUpdateInputDTO): Promise<void> =>{
        const {id, content, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new BadRequestError("Invalid token.")
        }

        const result = await this.commentDatabase.findCommentById(id)
        if(!result){
            throw new NotFoundError("'Id'not found.")
        }

        if(payload.id !== result.creator_id){
            throw new BadRequestError("'Id'invalid")
        }

        await this.commentDatabase.updateComment(id, content)
    }

    public delete = async(input: CommentDeleteInputDTO)=>{
        const {id, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new BadRequestError("Invalid token.")
        }

        const result = await this.commentDatabase.findCommentById(id)
        if(!result){
            throw new NotFoundError("'Id'not found.")
        }

        if(payload.id === result.creator_id || payload.role === USER_ROLES.ADMIN){
            await this.commentDatabase.deleteComment(id)
            await this.commentDatabase.decrementComment(result.post_id)
        }else{
            throw new BadRequestError("Access denied.")
        }
    }


    public likeDislike = async(input: CommentLikeDislikeInputDTO) =>{
        const {id: commentId, like, token} = input

        const isLiked = Number(like)
        
        const payload = this.tokenManager.getPayload(token)
        
        if (payload === null) {
            throw new BadRequestError("Invalid token.")
        }
        const userId = payload.id

        const result = await this.commentDatabase.findCommentById(commentId)

        if(typeof result === 'undefined'){
            throw new BadRequestError("comment not found.")
        }
        
        const likeDislikeDB: LikeDislikeCommentDB = {
            comment_id: commentId,
            user_id: userId,
            like: isLiked
        }

        const likeExist = await this.commentDatabase.findLikeDislike(commentId, userId)

        if(!likeExist){
            await this.commentDatabase.createLikeDislike(likeDislikeDB)
            if(isLiked === 1){
                await this.commentDatabase.incrementLike(commentId)
            }else{
                await this.commentDatabase.incrementDislike(commentId)
            }
        }else{
            if(isLiked !== likeExist.like){
                await this.commentDatabase.createLikeDislike(likeDislikeDB)
                if(isLiked === 1){
                    await this.commentDatabase.revertDislikeToLike(commentId)
                }else{
                    await this.commentDatabase.revertLikeToDislike(commentId)
                }
            }else{
                await this.commentDatabase.deleteLikeDislike(commentId, userId)

                if(isLiked === 1){
                    await this.commentDatabase.decrementLike(commentId)
                }else{
                    await this.commentDatabase.decrementDislike(commentId) 
                }
            }
            
        }
        
    }
}