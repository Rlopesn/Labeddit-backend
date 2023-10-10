import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { commentGetAllSchema } from "../../../src/dtos/comments/commentsGet.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método getComment", ()=>{
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve retornar todos os comentários", async()=>{
        const input = commentGetAllSchema.parse({
            token: "token-mock-dev"
        })

        await expect(commentBusiness.get(input)).resolves.not.toThrowError()
    })

    test("Deve retornar erro caso token invalido", async()=>{
        expect.assertions(1)
        try {
            const input = commentGetAllSchema.parse({
                token: "token-dev"
            }) 

            await commentBusiness.get(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token invalido.")
            }
        }
    })
})