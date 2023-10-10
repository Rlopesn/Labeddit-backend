import { ZodError } from "zod";
import { CommentBusiness } from "../business/CommentBusiness";
import express, { Request, Response } from 'express'
import { BaseError } from "../errors/BaseError";
import { commentCreateSchema } from "../dtos/comments/commentsCreate.dto";
import { commentGetAllSchema } from "../dtos/comments/commentsGet.dto";
import { commentUpdateSchema } from "../dtos/comments/commentsUpdate.dto";
import { commentDeleteSchema } from "../dtos/comments/commentsDelete.dto";
import { commentLikeDislikeSchema } from "../dtos/comments/commentsLikeDislike.dto";

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {

            const input = commentCreateSchema.parse({
                post_id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            await this.commentBusiness.create(input)

            res.sendStatus(201)

        } catch (error) {
            console.log(error);
            
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unexpected error.")
            }
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {

            const input = commentGetAllSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.commentBusiness.get(input)

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

    public update = async (req: Request, res: Response) => {
        try {
            const input = commentUpdateSchema.parse({
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            await this.commentBusiness.update(input)

            res.status(200).send({ message: "Updated" })

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

    public delete = async (req: Request, res: Response) => {
        try {
            const input = commentDeleteSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            await this.commentBusiness.delete(input)

            res.status(200).send({ message: "Post deleted." })
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


    public likeDislike = async (req: Request, res: Response) => {
        try {
            const input = commentLikeDislikeSchema.parse({
                id: req.params.id,
                like: req.body.like,
                token: req.headers.authorization
            })

            await this.commentBusiness.likeDislike(input)

            res.sendStatus(200)
        } catch (error) {
            console.log(error);

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