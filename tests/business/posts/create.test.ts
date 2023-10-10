import {PostBusiness} from '../../../src/business/PostBusiness'
import { postCreateSchema } from '../../../src/dtos/posts/postCreate.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe("Testanto método de createPost", ()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve criar um novo post", async()=>{
        const input = postCreateSchema.parse({
            content: "Bom dia",
            token: "token-mock-dev"
        })

        await expect(postBusiness.create(input)).resolves.not.toThrowError()
    })

    test("Deve gerar erro se o token for invalido", async()=>{
        expect.assertions(1)
        try {
            const input = postCreateSchema.parse({
                content: "Bom dia",
                token: "token-dev"
            })
    
            const output = await postBusiness.create(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toEqual("token invalido.")     
            }  
        }
    })
})