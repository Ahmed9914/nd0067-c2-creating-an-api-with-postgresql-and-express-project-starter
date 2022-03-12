import express, { Request, response, Response } from 'express';
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const create = async (request: Request, response: Response) => {
    const user: User = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password
    };

    try {
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRET as string);
        // console.log(token);
        response.status(201);
        response.json(token);
    } catch (error) {
        response.status(400);
        response.json(`Can't create user: ${user}: ${error}`);
    }

}


const userRoutes = (app: express.Application) => {
    app.post('/users/create', create);
}

export default userRoutes;