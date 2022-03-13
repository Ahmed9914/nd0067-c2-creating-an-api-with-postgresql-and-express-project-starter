setup:
- create .env file contains the following data:
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_TEST_DB=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=some-random-text
SALT_ROUNDS=10
ENV=dev

[extra]- In the directory contains docker-compose.yml file run docker-compose up

[extra]- After finishing compose, in terminal run: `docker ps` to show all of the docker containers that are running. Then, well find the CONTAINER ID of the container we wish to enter and run `docker exec -it CONTAINER_ID bash -l`

- To confirm psql is working, run the following commands in terminal:
`su postgres`
`psql -h localhost -U full_stack_user full_stack_dev`
`psql -h localhost -U full_stack_user full_stack_test`
If the setup is successful, posgres interactive terminal will start

- For testing database setup add a new database called full_stack_test by the running command `CREATE DATABASE full_stack_test;` inside posgres interactive terminal.

[extra] - After installing db-migrate globally and db-migrate-pg locally, run the commands:
 `db-migrate create products-table --sql-file`
 `db-migrate create users-table --sql-file`

 - Run `db-migrate up` after structuring sql files.

 

