import { CommentUserDB, CommentsDB, LikeDislikeCommentDB } from "../types";
import { BaseDatabase } from "./Basedatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

    public async createComment(newComment: CommentsDB): Promise<CommentsDB[]> {
        const result: CommentsDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(newComment)
        return result
    }

    public async findComment(): Promise<CommentUserDB[]> {
        const result: CommentUserDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).select(
            "comments.id",
            "comments.creator_id",
            "comments.content",
            "comments.like",
            "comments.dislike",
            "comments.created_at",
            "comments.updated_at",
            "users.id as userId",
            "users.name as userName",
            "post_id as postId"
        ).from("comments").innerJoin("users", "comments.creator_id", "users.id").innerJoin("post", "comments.post_id", "post.id")

        return result
    }

    public async findCommentById(id: string): Promise<CommentsDB | undefined> {
        const [result] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).where({ id })

        if (!result) {
            return undefined
        }

        const comment: CommentsDB = {
            id: result.id,
            post_id: result.post_id,
            creator_id: result.creator_id,
            content: result.comment,
            like: result.like,
            dislike: result.dislike,
            created_at: result.created_at,
            updated_at: result.updated_at
        }

        return comment
    }

    public async updateComment(id: string, content: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).update({content}).where({id})
    }

    public async deleteComment(id: string): Promise<void> {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).del().where({id})
    }


    public async findLikeDislike(commentId: string, userId: string): Promise<LikeDislikeCommentDB>{
        const [result]: LikeDislikeCommentDB[]=  await BaseDatabase.connection("likedislike_comments")
        .where({comment_id: commentId})
        .andWhere({user_id: userId})
        return result
     }


     public async createLikeDislike(LikeDislikeCommentDB:LikeDislikeCommentDB): Promise<void>{
        await BaseDatabase.connection("likedislike_comments")
        .insert(LikeDislikeCommentDB).onConflict(['user_id', 'comment_id'])
        .merge()
    }

    public async deleteLikeDislike(commentId: string, userId: string): Promise<void>{
        await BaseDatabase.connection("likedislike_comments").del()
        .where({comment_id: commentId})
        .andWhere({user_id: userId})
    }

    public async incrementLike(commentId: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
        .where({id: commentId})
        .increment('like')
    }

    public async decrementLike(commentId: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
        .where({id: commentId})
        .decrement('like')
    }

    public async incrementDislike(commentId: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
        .where({id: commentId})
        .increment('dislike')
    }

    public async decrementDislike(commentId: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
        .where({id: commentId})
        .decrement('dislike')
    }

    public async revertLikeToDislike(commentId: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
        .where({id: commentId})
        .increment('dislike')
        .decrement('like')
    }

    public async revertDislikeToLike(commentId: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
        .where({id: commentId})
        .increment('like')
        .decrement('dislike')
    }

    public async incrementeComment(idPost: string): Promise<void>{
        await BaseDatabase.connection("post").where({id: idPost})
        .increment("comments")
    }

    public async decrementComment(idPost: string): Promise<void>{
        await BaseDatabase.connection("post").where({id: idPost})
        .decrement("comments")
    }
}