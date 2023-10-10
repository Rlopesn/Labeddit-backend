import { z } from "zod"

export interface CommentLikeDislikeInputDTO {
    id: string,
    like: boolean,
    token: string
}

export const commentLikeDislikeSchema = z.object({
    id: z.string().min(2),
    like: z.boolean(),
    token: z.string().min(2)
}).transform(data => data as CommentLikeDislikeInputDTO)