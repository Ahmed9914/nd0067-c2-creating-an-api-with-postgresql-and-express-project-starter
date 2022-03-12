import { client } from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS} = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds: unknown = SALT_ROUNDS;

export type User = {
  id?: number,
  firstName: string;
  lastName: string;
  password_digest?: string;
  password: string;
};

export class UserStore {    
    async create(user: User): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES($1, $2, $3) RETURNING *';
          
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds as string));
    
            const result = await connection.query(sql, [user.firstName, user.lastName, hash]);
            const newUser = result.rows[0];
    
            connection.release();
            return newUser;

        } catch(error) {
          throw new Error(`unable create user (${user}): ${error}`);
        } 
      }

    async authenticate(id: number, password: string): Promise<User | null> {
      try {
        const connection = await client.connect();
        const sql = 'SELECT password_digest FROM users WHERE id=($1)';
    
        const result = await connection.query(sql, [id]);
    
        if (result.rows.length) {
    
          const user = result.rows[0];
    
          if (bcrypt.compareSync(password+pepper, user.password_digest)) {
            return user;
          }
        }
    
        return null;

      } catch(error) {
        throw new Error(`Can't authenticate user: ${error}`);
      } 
    }
}