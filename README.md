# Storefront Backend Project

## How to setup and connect to the database:

1. In the directory contains docker-compose.yml file run `docker-compose up`.

2. After finishing compose, in terminal run: `docker ps` to show all of the docker containers that are running. Then, well find the CONTAINER_ID of the container we wish to enter and run `docker exec -it CONTAINER_ID bash -l`.

3. To confirm psql is working, run the following commands in terminal:

```
su postgres
psql -h localhost -U full_stack_user full_stack_dev
psql -h localhost -U full_stack_user full_stack_test
```

4. Create databases full_stack_dev, full_stack_test by the running the following commands inside postgres interactive terminal

```
CREATE DATABASE full_stack_dev;
CREATE DATABASE full_stack_test;
```

5. create .env file contains the following data:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_TEST_DB=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123

BCRYPT_PASSWORD=some-random-text
SALT_ROUNDS=10

TOKEN_SECRET=secret123!

ENV=dev
```

## 	What ports the backend and database are running on:

Backend on port 3000 and database on port 5432.

## 	Package installation instructions and running the project:

1. Install dependencies by running:

```
npm install
```

Noting that db-migrate should be installed globally for running from command line.

2. The command to run development server is:

```
npm run start-dev
```

3. The command for testing is:

```
npm run test
```