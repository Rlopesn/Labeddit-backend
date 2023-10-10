import { UserDatabase } from "../database/UserDatabase";
import { UserCreatedInputDTO, UserCreatedOutputDTO } from "../dtos/users/userCreated.dto";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from '../services/HashManager'
import { USER_ROLES, User } from "../models/User";
import { UserDB } from "../types";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { UserLoginInputDTO, UserLoginOutputDTO } from "../dtos/users/userLogin.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { UserGetAllOutputDTO } from "../dtos/users/userGetAll.dto";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ) { }

    public insertUser = async (input: UserCreatedInputDTO): Promise<UserCreatedOutputDTO> => {
        const { name, email, password } = input

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const emailExist = await this.userDatabase.findUserByEmail(email)

        if (emailExist) {
            throw new BadRequestError("'e-mail' already registered")
        }

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: USER_ROLES.NORMAL,
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.createUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: UserCreatedOutputDTO = {
            message: "User registered successfully",
            token: token
        }
        return output

    }

    public getAll = async (): Promise<UserGetAllOutputDTO[]> => {
        const result = await this.userDatabase.findUser()

        const output: UserGetAllOutputDTO[] = result.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.created_at
        }))
        return output

    }


    public login = async (input: UserLoginInputDTO): Promise<UserLoginOutputDTO> => {
        const { email, password } = input

        const user = await this.userDatabase.findUserByEmail(email)


        if (!user) {
            throw new BadRequestError("e-mail not found.")
        }

        const isValidPassword = await this.hashManager.compare(password, user.password)

        if (!isValidPassword) {
            throw new BadRequestError("invalid password")
        }

        const tokenPayload: TokenPayload = {
            id: user.id,
            name: user.name,
            role: user.role as USER_ROLES
        }

        const token = this.tokenManager.createToken(tokenPayload)


        const output: UserLoginOutputDTO = {
            token: token
        }

        return output
    }
}