# React-Express-GraphQL Starter <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->
- [Getting Started - Server](#getting-started---server)
  - [Install Dependencies](#install-dependencies)
  - [Create .env](#create-env)
  - [Install Node Dependencies](#install-node-dependencies)
  - [Create ormconfig.json](#create-ormconfigjson)
  - [Create database & fill with mock data](#create-database--fill-with-mock-data)
  - [Start the server](#start-the-server)
- [Getting Started - Client](#getting-started---client)
  - [Install Dependencies](#install-dependencies-1)

---

## Getting Started - Server
### Install Dependencies
- Powershell Core 7
- Node.js

### Create .env
```
PORT=4000
TOKEN_SECRET=___
```

### Install Node Dependencies
```sh
server> npm i
```

### Create ormconfig.json
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "___",
  "password": "___",
  "database": "TMP_DATABASE",
  "entities": ["src/entities/*.ts"],
  "autoSchemaSync": true,
  "logging": true
}
```

### Create database & fill with mock data
```
server> ./bin/init.ps1
server> ./bin/mock.ps1
```

### Start the server
```
server> npm run dev
```
NOTE: Sometimes server doesn't start correctly (errors regarding metadata are thrown). In such situations trigger reloading by modifying and saving any project's file. 

## Getting Started - Client

### Install Dependencies
- Node.js

