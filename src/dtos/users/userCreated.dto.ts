import { z } from "zod"

export interface UserCreatedInputDTO {
    name: string,
    email: string,
    password: string,
}

export interface UserCreatedOutputDTO {
    message: string,
    token: string
}

export const userCreatedSchema = z.object({
    name: z.string({
        invalid_type_error: "'name' must be of type string."
    }).min(2),
    email: z.string({
        invalid_type_error: "'email' must be of type string."
    }).email("'email' invalido"),
    password: z.string({
        invalid_type_error: "'password' must be of type string."
    }).min(5),
}).transform(data => data as UserCreatedInputDTO)

