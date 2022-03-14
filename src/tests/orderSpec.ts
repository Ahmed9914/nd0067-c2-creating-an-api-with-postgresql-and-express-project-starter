import { User, UserStore } from "../models/user";
import { Order, OrderStore } from "../models/order";
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';

const orderStore = new OrderStore();
const userStore = new UserStore();

let orderCreatorResponse: User;

const request = supertest(app);

describe("Orders tests", () => {
    
    describe("Order CRUD operations tests", () => {
        it('Should return a list of all Orders', async () => {
            const result = await orderStore.index();
            expect(result).toEqual([]);
            });
        
        it('should add a new Order to Orders table', async () => {
            const orderCreator: User = {
                firstname: 'order',
                lastname: 'creator',
                password: 'password'
            };
            orderCreatorResponse = await userStore.create(orderCreator);

            const order: Order = {
                status_order: "active",
                user_id: orderCreatorResponse.id?.toString() as string
            };

            const newOrder = await orderStore.createOrder(order);
            expect(newOrder.id).toEqual(1);
        })

        it('should return active orders of a user',async () => {
            const activeOrders = await orderStore.userActiveOrders(orderCreatorResponse.id?.toString() as string);
            expect(activeOrders.length).toEqual(1);
        })

        it('should add a product to an existing order', async () => {
            // Add quantity of 5 shoes into order 1
            const result = await orderStore.addProduct(5, '1', '1');
            expect(result.id).toEqual(1);

        });


        it('Should return a single order by querying its id', async () => {
            const result = await orderStore.show('1');
            expect(result.id).toEqual(1);
        })
    });

    describe('orders endpoint requests tests', () => {
        it('request to index returns created orders (currently one order)', async () => {
            const response = await request.get('/orders');
            expect(JSON.parse(response.text).length).toEqual(1);
        });

        it('request to show with id returns the requested order', async () => {
            const response = await request.get('/orders/1');
            expect(JSON.parse(response.text).order_status).toEqual('active');
        });

        it('should return active orders of a user', async () => {
            jwt.sign({ user: orderCreatorResponse}, process.env.TOKEN_SECRET as string, async (_err: unknown, genToken: unknown) => {
                const authToken = await genToken;
                const response = await request.get(`/users/3/orders?token=${authToken}`);
                expect(JSON.parse(response.text).length).toEqual(1);
            });
            
        });

        it('should create a new order if a jwt token submitted', async () => {
            jwt.sign({ user: orderCreatorResponse}, process.env.TOKEN_SECRET as string, async (_err: unknown, genToken: unknown) => {
                const authToken = await genToken;
                const response = await request
                .post('/orders')
                .send({
                    status_order: "inactive",
                    user_id: orderCreatorResponse.id?.toString() as string,
                    token: authToken
                });
                expect(response.statusCode).toEqual(201);
            });
        });

        it('should add product to a given order', async () => {
            jwt.sign({ user: orderCreatorResponse}, process.env.TOKEN_SECRET as string, async (_err: unknown, genToken: unknown) => {
                const authToken = await genToken;
                const response = await request
                .post('/orders/1')
                .send({
                    productId: "2",
                    quantity: 3,
                    token: authToken
                });
                expect(response.statusCode).toEqual(201);
            });
        });
    })
});