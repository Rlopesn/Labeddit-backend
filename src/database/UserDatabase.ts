import { UserDB } from "../types";
import { BaseDatabase } from "./Basedatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async createUser(newUserDB: UserDB): Promise<void>{
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB)
    }

    public async findUserByEmail(email: string): Promise<UserDB>{
        const [result] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email})
        return result
    }

    public async findUser(): Promise<UserDB[]>{
       const result: UserDB[] =  await BaseDatabase.connection(UserDatabase.TABLE_USERS)
       return result
    }
}