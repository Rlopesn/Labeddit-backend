import { UserBusiness } from "../../../src/business/UserBusiness"
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { userCreatedSchema } from "../../../src/dtos/users/userCreated.dto"
import { ZodError } from "zod"

describe("Testando modulos de insertUser", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )
    test("Deve gerar um token ao cadastrar usuário", async () => {
        const input = userCreatedSchema.parse({
            name: "Simone",
            email: "simone@email.com",
            password: "simone1973"
        })

        const output = await userBusiness.insertUser(input)

        expect(output).toEqual({
            message: "Usuário cadastrado com sucesso.",
            token: "token-mock"
        })
    })

    test("deve disparar erro se email já cadastrado", async () => {
        const input = userCreatedSchema.parse({
            name: "Ana Clara",
            email: "dev@email.com",
            password: "ac1995"
        })

       await expect(userBusiness.insertUser(input)).rejects.toThrow()
    })

    test("deve disparar erro se name tiver menos que 2 caracteres", async () => {
        try {
            const input = userCreatedSchema.parse({
                name: "A",
                email: "fulano@email.com",
                password: "ac1995"
            })
        } catch (error) {
            if(error instanceof ZodError){
                expect(error.issues[0].message).toBe('String must contain at least 2 character(s)')
                
            }
        }
    })

    test("deve disparar erro se password tiver menos que 5 caracteres", async () => {
        try {
            const input = userCreatedSchema.parse({
                name: "Ana Clara",
                email: "dev@email.com",
                password: "ac1"
            })
        } catch (error) {
            if(error instanceof ZodError){
                expect(error.issues[0].message).toBe('String must contain at least 5 character(s)')    
            }
        }
    })
})