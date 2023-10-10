import { z } from "zod"

export interface CommentUpdateInputDTO{
    id: string,
    content: string,
    token: string
}

export const commentUpdateSchema = z.object({
    id: z.string({
        required_error: "'id' is required",
      invalid_type_error: "'id' must be of type string"
    }),
    content: z.string({
        invalid_type_error: "'content' must be of type string"
    }),
    token: z.string().min(2)
}).transform(data => data as CommentUpdateInputDTO)