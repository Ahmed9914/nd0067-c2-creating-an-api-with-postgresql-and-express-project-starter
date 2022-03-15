# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## RESTful routes
#### Products
```
GET http:/localhost:3000/products

POST http:/localhost:3000/products

with body:
{
  name: 'food',
  price: 10,
  token: authToken
}

GET http:/localhost:3000/products/:id
```

#### User
```
POST http:/localhost:3000/users/create
with body:
{
    firstname: 'Ahmed',
    lastname: 'Abdelaal1',
    password: 'password'
}

POST http:/localhost:3000/users/:id
with body:
{password: '123456'}

GET http:/localhost:3000/users?token=authToken

GET http:/localhost:3000//users/:id?token=authToken
```

#### Orders
```
GET http:/localhost:3000/orders?token=authToken

GET http:/localhost:3000/orders/:id?token=authToken

GET http:/localhost:3000/users/:id/orders?token=authToken

POST http:/localhost:3000/orders/:id
with body:
{
    productId: "2",
    quantity: 3,
    token: authToken
}
    
```

## Database schema:
#### Product
```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC(2)
);
```

#### User
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100), 
    password_digest VARCHAR
);
```

#### Orders
```
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
```

```
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

