import { Pool } from 'pg';
import { devClient } from '../database';

export type Product = {
    id: number;
    name: string;
    price: number;
};

export class ProductStore {
    async index(client: Pool = devClient): Promise<Product[]> {
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
}