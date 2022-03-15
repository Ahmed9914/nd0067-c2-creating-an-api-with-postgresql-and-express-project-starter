import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware';
import { Order, OrderStore } from "../models/order";

const orderStore = new OrderStore();

const createOrder = async (request: Request, response: Response) => {
    try {
        const order: Order = {
            status_order: request.body.status_order,
            user_id: request.body.user_id
        };
        const newOrder = await orderStore.createOrder(order);
        response.status(201);
        response.json(newOrder);
    } catch(error) {
        response.status(400);
        response.json(error);
    }
}


const addProduct = async (_request: Request, response: Response) => {
    const orderId: string = _request.params.id;
    const productId: string = _request.body.productId;
    const quantity: number = parseInt(_request.body.quantity);
   
    try {
        const addedProduct = await orderStore.addProduct(quantity, orderId, productId);
        response.json(addedProduct);
        response.status(201);
    } catch(err) {
           response.status(400);
           response.json(err);
    }
}

const ordersIndex = async (_request: Request, response: Response) => {
    const orders = await orderStore.index();
    response.json(orders);
}

const showOrder = async (request: Request, response: Response) => {
    try {
        const order = await orderStore.show(request.params.id);
        response.json(order);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

const userActiveOrders = async (_request: Request, response: Response) => {
    const userId: string = _request.params.id;
    
    try {
        const orders = await orderStore.userActiveOrders(userId);
        response.json(orders);
    } catch(error) {
        response.status(400);
        response.json(error);
    }
}
 

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyToken, ordersIndex);
    app.get('/orders/:id', verifyToken, showOrder);
    app.get('/users/:id/orders', verifyToken, userActiveOrders);
    app.post('/orders', verifyToken, createOrder);
    app.post('/orders/:id', verifyToken, addProduct);
}

export default orderRoutes;