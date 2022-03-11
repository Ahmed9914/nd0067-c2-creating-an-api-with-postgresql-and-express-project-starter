import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

const PG_DATABASE = process.env.ENV === "test" 
? POSTGRES_TEST_DB 
: POSTGRES_DB

export const client = new Pool({
    host: POSTGRES_HOST,
    database: PG_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});