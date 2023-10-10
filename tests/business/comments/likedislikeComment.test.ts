import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { commentLikeDislikeSchema } from "../../../src/dtos/comments/commentsLikeDislike.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método likeDislike", ()=>{
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve retornar erro caso token inválido", async()=>{
        expect.assertions(1)
        try {
            const input = commentLikeDislikeSchema.parse({
                id: "id-com-01",
                like: true,
                token: "token-dev"
            })

            await commentBusiness.likeDislike(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token invalido.")
            }
        }
    })

    test("Deve retornar erro caso comentário não localizado", async()=>{
        expect.assertions(1)
        try {
            const input = commentLikeDislikeSchema.parse({
                id: "id-com",
                like: true,
                token: "token-mock-dev"
            })

            await commentBusiness.likeDislike(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("Comentário não localizado.")
            }
        }
    })

    test("Deve dar like em um comentário", async()=>{
        const input = commentLikeDislikeSchema.parse({
            id: "id-com-01",
            like: true,
            token: "token-mock-dev"
        })

         await expect(commentBusiness.likeDislike(input)).resolves.not.toThrowError()
    })

    test("Deve dar dislike em um comentário",async()=>{
        const input = commentLikeDislikeSchema.parse({
            id: "id-com-01",
            like: false,
            token: "token-mock-dev"
        })

         await expect(commentBusiness.likeDislike(input)).resolves.not.toThrowError()
    })
})