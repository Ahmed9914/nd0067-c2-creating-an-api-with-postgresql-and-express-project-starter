import { Product, ProductStore } from "../models/product";
import supertest from 'supertest';
import app from '../server';
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken';

const productStore = new ProductStore();
const userStore = new UserStore();

const request = supertest(app);

describe("Products tests", () => {
    
    describe("Product CRUD operations tests", () => {
        it('Should return a list of all products', async () => {
            const result = await productStore.index();
            expect(result).toEqual([]);
            });
        
        it('should add a new product to products table', async () => {
            const product: Product = {
                name: "shoes",
                price: 20
            };

            const newProduct = await productStore.create(product);
            expect(newProduct.id).toBe(1);
        })
    });

    describe('products endpoint requests tests', () => {
        it('request to index returns created products', async () => {
            const response = await request.get('/products');
            expect(response.text).toBe('[{"id":1,"name":"shoes","price":"20"}]');
        });

        it('should create a new product if a jwt token submitted', async () => {
                const productCreator: User = {
                    firstname: 'create',
                    lastname: 'products',
                    password: '123456'
                };
                const productCreatorResponse = await userStore.create(productCreator);
                
                jwt.sign({ user: productCreatorResponse}, process.env.TOKEN_SECRET as string, async (err: unknown, genToken: unknown) => {
                    const authToken = await genToken;
                    const response = await request
                    .post('/products')
                    .send({
                        name: 'food',
                        price: 10,
                        token: authToken
                    });
                    expect(response.statusCode).toBe(201);
            });
        });


    });

});