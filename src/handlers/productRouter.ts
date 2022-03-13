import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware';
import { Product, ProductStore } from "../models/product";

const productStore = new ProductStore();

const index = async (_request: Request, response: Response) => {
    const products = await productStore.index();
    response.json(products);
}

const create = async (request: Request, response: Response) => {
    try {
        const product: Product = {
            name: request.body.name,
            price: request.body.price
        };
        const newProduct = await productStore.create(product);
        response.status(201);
        response.json(newProduct);
    } catch(error) {
        response.status(400);
        response.json(error);
    }

}

const show = async (request: Request, response: Response) => {
    try {
        const product = await productStore.show(request.params.id);
        response.json(product);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
 }
 

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', verifyToken, create);
    app.get('/products/:id', show);
}

export default productRoutes;