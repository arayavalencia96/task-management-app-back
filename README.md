# Project Management API

## Configuración

1. Clona el repositorio.
2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```dotenv
   DB_HOST=<your-cosmosdb-host>
   DB_PORT=5432
   DB_USERNAME=<your-username>
   DB_PASSWORD=<your-password>
   DB_NAME=<your-database-name>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
