import {CommentBusiness} from '../../../src/business/CommentBusiness'
import { commentCreateSchema } from '../../../src/dtos/comments/commentsCreate.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe("Testando metodo create", ()=>{
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve criar um comentario do post", async()=>{
        const input = commentCreateSchema.parse({
            post_id: "id-post-01",
            content: "Bom dia",
            token: "token-mock-astrodev"
        })
        await expect(commentBusiness.create(input)).resolves.not.toThrowError()
    })

    test("Deve retornar erro caso o token seja invalido", async()=>{
        expect.assertions(1)
        try {
            const input = commentCreateSchema.parse({
                post_id: "id-post-01",
                content: "Bom dia",
                token: "token-astrodev"
            }) 
            await commentBusiness.create(input)
        } catch (error) {
            if(error instanceof BadRequestError){
               expect(error.message).toEqual("token invalido") 
            }
        }
    })

    test("Deve retornar erro caso id do post não encontrado", async()=>{
        expect.assertions(1)
        try {
            const input = commentCreateSchema.parse({
                post_id: "id-post-004",
                content: "Bom dia",
                token: "token-mock-astrodev"
            })
            await commentBusiness.create(input)
            
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("Post não encontrado.") 
             }
        }
    })
})