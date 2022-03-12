import { Product, ProductStore } from "../../models/product";

const productStore = new ProductStore();

describe("Product CRUD operations tests", () => {
    it('Should return a list of all products', async () => {
        const result = await productStore.index();
        expect(result).toEqual([]);
        });
});
