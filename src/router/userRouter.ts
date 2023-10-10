import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'

export const userRouter = express.Router()

export const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new TokenManager()
    )
)

userRouter.post('/signup', userController.create)
userRouter.get('/', userController.getUser)
userRouter.post('/login', userController.login)