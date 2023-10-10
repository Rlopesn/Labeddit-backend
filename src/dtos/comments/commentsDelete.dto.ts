import { z } from "zod"

export interface CommentDeleteInputDTO {
    id: string,
    token: string
}

export const commentDeleteSchema = z.object({
    id: z.string({required_error: "'id' is required"}),
    token: z.string().min(2)
}).transform(data => data as CommentDeleteInputDTO)