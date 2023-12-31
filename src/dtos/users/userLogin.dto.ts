import { z } from "zod"

export interface UserLoginInputDTO {
    email: string,
    password: string
}

export interface UserLoginOutputDTO {
    token: string
}

export const userLoginSchema = z.object({
    email: z.string({
        invalid_type_error: "'email' must be of type string."
    }).email("'email' invalid"),
    password: z.string({invalid_type_error: "'password' must be of type string."
}).min(5)
}).transform(data => data as UserLoginInputDTO)