import { Product, ProductStore } from "../models/product";
import { User, UserStore } from "../models/user";
import supertest from 'supertest';
import app from '../server';
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
            expect(newProduct.id).toEqual(1);
        })

        it('Should return a single product by querying its id', async () => {
            const result = await productStore.show('1');
            expect(result.name).toEqual('shoes');
        })
    });

    describe('products endpoint requests tests', () => {
        it('request to index returns created products', async () => {
            const response = await request.get('/products');
            expect(response.text).toEqual('[{"id":1,"name":"shoes","price":"20"}]');
        });

        it('should create a new product if a jwt token submitted', async () => {
                const productCreator: User = {
                    firstname: 'product',
                    lastname: 'creator',
                    password: '123456'
                };
                const productCreatorResponse = await userStore.create(productCreator);
                
                jwt.sign({ user: productCreatorResponse}, process.env.TOKEN_SECRET as string, async (_err: unknown, genToken: unknown) => {
                    const authToken = await genToken;
                    const response = await request
                    .post('/products')
                    .send({
                        name: 'food',
                        price: 10,
                        token: authToken
                    });
                    expect(response.statusCode).toEqual(201);
            });
        });

        it('request to show with id returns the requested product', async () => {
            const response = await request.get('/products/1');
            expect(response.text).toEqual('{"id":1,"name":"shoes","price":"20"}');
        });


    });

});