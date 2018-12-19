# cautious-guide

Node.js Service

## Requirements

* [NodeJS](http://nodejs.org) - 4.8 or above

## Install

```sh
git clone https://github.com/raghavmac/cautious-guide
npm install
```
or `yarn` as alternative

## Run

`npm start` or `yarn start`

## Build

`npm run build` or `yarn build`

## Test

* **Unit** - `npm run test` or `yarn test`

**Note** - MongoDB must be running

## Docker

```sh
docker build .
docker run -d -p 5000:5000 <IMAGE_ID>
```

**Note** - Replace **MONGO_HOST** variable in `.env` file as,

* for Mac users - `docker.for.mac.localhost`

* for Windows users - `docker.for.windows.localhost`

## Endpoints

1. Top active users

```sh
GET /topActiveUsers
```
or
```sh
GET /topActiveUsers?page={pageNumber}
```

2. User resources

```sh
GET /users?id={user.id}
```