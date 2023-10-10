
import express, { Request, Response } from 'express'
import { UserBusiness } from "../business/UserBusiness";
import { userCreatedSchema } from "../dtos/users/userCreated.dto";
import { ZodError } from 'zod';
import { BaseError } from '../errors/BaseError';
import { userLoginSchema } from '../dtos/users/userLogin.dto';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public create = async (req: Request, res: Response) => {

        try {
            const input = userCreatedSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            const output = await this.userBusiness.insertUser(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unexpected error.")
            }
        }
    }

    public getUser = async (req: Request, res: Response) =>{
        try {
            const output = await this.userBusiness.getAll()

            res.status(200).send(output)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unexpected error.")
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input = userLoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })
            const output = await this.userBusiness.login(input)

            res.status(200).send(output)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unexpected error.")
            }
        }
    }

}