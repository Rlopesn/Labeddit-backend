import { ZodError } from "zod";
import { PostBusiness } from "../business/PostBusiness";
import { postCreateSchema } from "../dtos/posts/postCreate.dto";
import express, { Request, Response } from 'express'
import { BaseError } from "../errors/BaseError";
import { postGetAllSchema } from "../dtos/posts/postGet.dto";
import { postUpdateSchema } from "../dtos/posts/postUpdate.tdo";
import { postDeleteSchema } from "../dtos/posts/postDelete.dto";
import { likeDislikeSchema } from "../dtos/posts/postLikeDislike.dto";

export class PostController {
    constructor(
        private postBusines: PostBusiness
    ){}

    public insert = async(req: Request, res: Response) =>{
        try {
            const input = postCreateSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })
    
           await this.postBusines.create(input)
    
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

    public getAll = async(req: Request, res: Response)=>{
        try {
            const input = postGetAllSchema.parse({
                token: req.headers.authorization
            })

            const result = await this.postBusines.getAll(input)
            res.status(200).send(result)
            
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


    public update = async (req: Request, res: Response) =>{
        try {
            const input = postUpdateSchema.parse({
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            await this.postBusines.update(input)
            
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

            const input = postDeleteSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            await this.postBusines.delete(input)

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


    public likeDislike = async (req: Request, res: Response) =>{
        try {
            const input = likeDislikeSchema.parse({
                id: req.params.id,
                like: req.body.like,
                token: req.headers.authorization
            })
    
            await this.postBusines.likeDislike(input)
    
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