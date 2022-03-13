import { client } from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {    
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can't get products ${error}`);
        }  
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const connection = await client.connect();
            const result = await connection.query(sql, [product.name, product.price]);
            const createdProduct = result.rows[0];
            connection.release();
            return createdProduct;
        } catch (error) {
            throw new Error(`Could not add new product ${product.name}: ${error}`);
        }
    }

    
}