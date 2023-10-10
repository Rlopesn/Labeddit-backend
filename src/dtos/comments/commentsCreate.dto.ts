import { z } from "zod"

export interface CommentCreateInputDTO {
    post_id: string,
    content: string,
    token: string
}

export const commentCreateSchema = z.object({
    post_id: z.string().min(2),
    content: z.string(),
    token: z.string()
}).transform(data => data as CommentCreateInputDTO)