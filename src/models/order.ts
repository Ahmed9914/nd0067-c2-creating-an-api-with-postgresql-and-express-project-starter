import { client } from '../database';
import { User } from './user';

export type Order = {
    id?: number;
    status_order: string;
    user_id: string;
  };

export type OrderProduct = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string
  };

  export class OrderStore {
      async createOrder(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (order_status, user_id) VALUES($1, $2) RETURNING *';
            const connection = await client.connect();
            const result = await connection.query(sql, [order.status_order, order.user_id]);
            const createdOrder = result.rows[0];
            connection.release();
            return createdOrder;
        } catch (error) {
            throw new Error(`Could not add new order for user ${order.user_id}: ${error}`);
        }

      }

      async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
          try {
              const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
              const connection = await client.connect();
              
              const result = await connection.query(sql, [quantity, orderId, productId]);
            
              const order = result.rows[0];

              connection.release();

              return order;

            } catch (error) {
                throw new Error(`Could not add product ${productId} to order ${orderId}: ${error}`);
            }
        };

        async userActiveOrders(user_id:string): Promise<{id: string}[]> {
            try {
              const connection = await client.connect();
              const sql = 'SELECT orders.id FROM orders INNER JOIN users ON users.id = ($1) where order_status = \'active\'';
              const result = await connection.query(sql, [user_id]);
              connection.release()
              return result.rows;
            } catch (error) {
              throw new Error(`unable get user ${user_id} active orders: ${error}`)
            }
        }

        async index(): Promise<Order[]> {
            try {
                const connection = await client.connect();
                const sql = 'SELECT * FROM orders';
                const result = await connection.query(sql);
                connection.release();
                return result.rows;
            } catch (error) {
                throw new Error(`Can't get orders ${error}`);
            }  
        }

        async show(id: string): Promise<Order> {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const connection = await client.connect();
                const result = await connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            } catch (error) {
                throw new Error(`Could not find order ${id}. Error: ${error}`)
            }
          }


}