import { Product, ProductStore } from "../models/product";
import supertest from 'supertest';
import app from '../server';

const productStore = new ProductStore();

const request = supertest(app);

describe("Products tests", () => {
    
    describe("Product CRUD operations tests", () => {
        it('Should return a list of all products', async () => {
            const result = await productStore.index();
            expect(result).toEqual([]);
            });
    });

    describe('products endpoint requests tests', () => {
        it('request to index returns empty list before creating any products', async () => {
            const response = await request.get('/products');
            expect(response.text).toBe('[]');
        });
    });

});