import { ZodError } from "zod"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { postGetAllSchema } from "../../../src/dtos/posts/postGet.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Tetando método getAll", ()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve retornar todos os posts", async()=>{
        const input = postGetAllSchema.parse({
            token:"token-mock-dev"
        })

        const output = await postBusiness.getAll(input)
        expect(output).toHaveLength(2)
    })

    test("Deve retornar erro caso token seja inválido", async()=>{
         expect.assertions(1)
        try {
            const input = postGetAllSchema.parse({
                token:"token-dev"
            })
            
            await postBusiness.getAll(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token invalido.") 
            }
        } 
    })
})