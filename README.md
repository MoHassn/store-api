# Storefront Backend Project

## Description

This project demonstrates the knowledge of building a backend api using Node.js and Express.js and PostgreSQL.

## Instructions

follow these steps to start the project

- clone the repository
- run `npm install`
- create .env file at the root directory that contains the following:
  ```
  DB_HOST={your postgresql database host}
  DB_NAME={your postgresql database name}
  DB_USER={your postgresql database user}
  DB_PASSWORD={your postgresql database password}
  JWT_SECRET={your jwt secret}
  ENV=dev
  ```
- create a database.json file at the root directory that contains the following:

  ```
  {
    "dev": {
      "driver": "pg",
      "host": "{your postgresql database host}",
      "database": "{your postgresql database name}",
      "user": "{your postgresql database user}",
      "password": "{your postgresql database password}",
    },
    "test": {
      "driver": "pg",
      "host": "{your postgresql database host}",
      "database": "{your test postgresql database name}",
      "user": "{your postgresql database user}",
      "password": "{your postgresql database password}",
    },
  }

  ```

- install db-migrate globally by running `npm install -g db-migrate`
- run `db-migrate up` to create the database tables
- run `npm run watch` to start the development server

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
