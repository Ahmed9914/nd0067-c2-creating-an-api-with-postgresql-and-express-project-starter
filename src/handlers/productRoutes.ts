import express, { Request, Response } from 'express';
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_request: Request, response: Response) => {
    const products = await store.index();
    response.json(products);
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
}

export default productRoutes;