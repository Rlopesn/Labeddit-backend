import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { commentDeleteSchema } from "../../../src/dtos/comments/commentsDelete.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método deleteComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve deletar comentário", async () => {
            const input = commentDeleteSchema.parse({
                id: "id-com-01",
                token: "token-mock-astrodev"
            })

            await expect(commentBusiness.delete(input)).resolves.not.toThrowError()
        })

    test("Deve retornar erro caso token inválido", async()=>{
        expect.assertions(1)
        try {
            const input = commentDeleteSchema.parse({
                id: "id-com-01",
                token: "token-astrodev"
            })

            await commentBusiness.delete(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token inválido.")
            }
        }
    })

    test("Deve retornar erro caso id não localizado", async()=>{
        expect.assertions(1)
        try {
            const input = commentDeleteSchema.parse({
                id: "id-com-0",
                token: "token-mock-astrodev"
            })

            await commentBusiness.delete(input)
        } catch (error) {
            if(error instanceof NotFoundError){
                expect(error.message).toEqual("'Id'não localizado.")
            }
        }
    })

    test("Deve retornar acesso negado caso dados do Dto inválidos", async()=>{
        expect.assertions(1)
        try {
            const input = commentDeleteSchema.parse({
                id: "id-com-01",
                token: "token-mock-dev"
            })
            await commentBusiness.delete(input)
        } catch (error) {
            console.log(error);
            
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("acesso negado.")
            }
        }
    })
})



