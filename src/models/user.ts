import { client } from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS} = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds: unknown = SALT_ROUNDS;

export type User = {
    firstName: string;
    lastName: string;
    username: string;
    password_digest?: string;
    password: string;
};

export class UserStore {    
    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
          
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds as string));
    
            const result = await conn.query(sql, [user.firstName, user.lastName, user.username, hash]);
            const newUser = result.rows[0];
    
            conn.release();
            return newUser;

        } catch(err) {
          throw new Error(`unable create user (${user.username}): ${err}`)
        } 
      }
}