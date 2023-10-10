import { z } from "zod"

export interface CommentGetInputDTO {
    token: string
}

export interface CommentsGetOutputDTO {
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        post_id: string
        name: string
    }
}

export const commentGetAllSchema = z.object({
    token: z.string()
}).transform(data => data as CommentGetInputDTO)