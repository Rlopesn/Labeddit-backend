import { PostBusiness } from "../../../src/business/PostBusiness"
import { postDeleteSchema } from "../../../src/dtos/posts/postDelete.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método delete", ()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve deletar post", async()=>{
        const input = postDeleteSchema.parse({
            id: "id-post-01",
            token: "token-mock-dev"
        })
        await expect(postBusiness.delete(input)).resolves.not.toThrowError()
    })

    test("Deve retornar erro caso token inválido", async()=>{
        expect.assertions(1)
        try {
            const input = postDeleteSchema.parse({
                id: "id-post-01",
                token: "token-dev"
            })

            await postBusiness.delete(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token inválido.")
            }
        }
    })

    test("Deve retornar acesso negado caso dados do Dto inválidos", async()=>{
        expect.assertions(1)
        try {
            const input = postDeleteSchema.parse({
                id: "id-post",
                token: "token-mock-dev"
            })

            await postBusiness.delete(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("acesso negado.")
            }
        }
    })
})