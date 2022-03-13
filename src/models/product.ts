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

    /* async show(id: string): Promise<Book> {
        try {
        const sql = 'SELECT * FROM books WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`)
        }
      }
    
    async delete(id: string): Promise<Book> {
          try {
        const sql = 'DELETE FROM books WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    const book = result.rows[0]
    conn.release()
    return book
          } catch (err) {
              throw new Error(`Could not delete book ${id}. Error: ${err}`)
          }
      } */
    
}