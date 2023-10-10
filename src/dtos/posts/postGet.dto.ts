import { z } from "zod"

export interface PostGetInputDTO {
    token: string
}


export interface PostGetOutputDTO {
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string
    }
}

export const postGetAllSchema = z.object({
    token: z.string()
}).transform(data => data as PostGetInputDTO)