CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100), 
    username VARCHAR(100),
    password_digest VARCHAR
);