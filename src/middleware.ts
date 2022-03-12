import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (request: Request, response: Response) => {
    try {
        jwt.verify(request.body.token, process.env.TOKEN_SECRET as string);
    } catch (error) {
        response.status(401);
        response.json(`Invalid token: ${error}`);
        return;
    }
};