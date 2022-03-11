import { testClient } from "../database";
import { Product, ProductStore } from "../models/product";

const productStore = new ProductStore();

describe("Product Mode", () => {
    it('Should have index method', () => {
        expect(productStore.index).toBeDefined();
    });
    
    it('Should return a list of all products', async () => {
        const result = await productStore.index(testClient);
        expect(result).toEqual([]);
        });
});
