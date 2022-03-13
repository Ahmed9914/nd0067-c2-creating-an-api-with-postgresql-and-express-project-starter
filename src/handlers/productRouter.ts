import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware';
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_request: Request, response: Response) => {
    const products = await store.index();
    response.json(products);
}

const create =async (request: Request, response: Response) => {
    try {
        const product: Product = {
            name: request.body.name,
            price: request.body.price
        };
        const newProduct = await store.create(product);
        response.status(201);
        response.json(newProduct);
    } catch(error) {
        response.status(400);
        response.json(error);
    }

}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', verifyToken, create);
}

export default productRoutes;