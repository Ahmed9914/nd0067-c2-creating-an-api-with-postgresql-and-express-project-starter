import express, { Request, Response } from 'express';
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../middleware';

dotenv.config();

const userStore = new UserStore();

const create = async (request: Request, response: Response) => {
    const user: User = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        password: request.body.password
    };

    try {
        const newUser = await userStore.create(user);
        const token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRET as string);
        // console.log(token);
        response.status(201);
        response.json(token);
    } catch (error) {
        response.status(400);
        response.json(`Can't create user: ${user}: ${error}`);
    }
}

const authenticate = async (request: Request, response: Response) => {
    const user: User = {
      id: parseInt(request.params.id),
      password: request.body.password,
    };
    try {
        const authUser = await userStore.authenticate(user.id as number, user.password)
        var token = jwt.sign({ user: authUser }, process.env.TOKEN_SECRET as string);
        response.json(token)
    } catch(error) {
        response.status(401)
        response.json({ error })
    }
}

const index = async (_request: Request, response: Response) => {
    const users = await userStore.index();
    response.json(users);
}

const show = async (request: Request, response: Response) => {
    try {
        const user = await userStore.show(request.params.id);
        response.json(user);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
 }



const userRoutes = (app: express.Application) => {
    app.post('/users/create', verifyToken, create);
    app.post('/users/:id', authenticate);
    app.get('/users', verifyToken, index);
    app.get('/users/:id', verifyToken, show);
}

export default userRoutes;