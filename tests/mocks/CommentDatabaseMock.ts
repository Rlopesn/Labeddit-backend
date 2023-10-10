import { BaseDatabase } from "../../src/database/Basedatabase";
import { CommentsDB, CommentUserDB, LikeDislikeCommentDB } from "../../src/types";

const commentMock: CommentsDB[] = [
    {
        id: "id-com-01",
        post_id: "id-post-01",
        creator_id: "id-mock-astrodev",
        content: "Bom dia",
        like: 0,
        dislike: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }

]

const userMock = [{
    id: "u001",
    name: "Dev"
}]

const likesDislikesMock = [
    {
        comment_id: "id-com-01",
        user_id: "u001",
        like: 1
    }
]

export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

    public async createComment(newComment: CommentsDB): Promise<CommentsDB[]> {
        return [newComment]
    }

    public async findComment(): Promise<CommentUserDB[]> {
        const result: CommentUserDB[] = commentMock.map(comment => {
            const user = userMock.find(user => user.id === comment.creator_id)
            const newComment = {
                id: comment.id,
                post_id: comment.post_id,
                creator_id: comment.creator_id,
                content: comment.content,
                like: comment.like,
                dislike: comment.dislike,
                created_at: comment.created_at,
                updated_at: comment.updated_at,
                userId: user?.id as string,
                postId: comment.post_id as string,
                userName: user?.name as string
            }
            return newComment
        })

        return result
    }

    public async findCommentById(id: string): Promise<CommentsDB | undefined> {
        return commentMock.find(comment => comment.id === id)
    }

    public async updateComment(id: string, content: string): Promise<void> {

    }

    public async deleteComment(id: string): Promise<void> {
        
    }

    public async findLikeDislike(commentId: string, userId: string): Promise<LikeDislikeCommentDB>{
        const [result]: LikeDislikeCommentDB[]= likesDislikesMock.filter(like => like.user_id === userId && like.comment_id === commentId)

        return result
     }


     public async createLikeDislike(LikeDislikeCommentDB:LikeDislikeCommentDB): Promise<void>{
        
    }

    public async deleteLikeDislike(commentId: string, userId: string): Promise<void>{
        
    }

    public async incrementLike(commentId: string): Promise<void>{
        
    }

    public async decrementLike(commentId: string): Promise<void>{
        
    }

    public async incrementDislike(commentId: string): Promise<void>{
        
    }

    public async decrementDislike(commentId: string): Promise<void>{
        
    }

    public async revertLikeToDislike(commentId: string): Promise<void>{
        
    }

    public async revertDislikeToLike(commentId: string): Promise<void>{
        
    }

    public async incrementeComment(idPost: string): Promise<void>{
        
    }

    public async decrementComment(idPost: string): Promise<void>{
        
    }
}