import {UserBusiness} from "../../../src/business/UserBusiness"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando metodo get", ()=>{

    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )
    test("Deve retornar todos os usuários cadastrados", async()=>{
        const users = await userBusiness.getAll()
        expect(users).toHaveLength(2)
    })
})