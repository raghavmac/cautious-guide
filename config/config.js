import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['dev', 'prod'])
    .default('dev'),
  PORT: Joi.number()
    .default(5000),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  POSTGRES_DB: Joi.string()
    .required()
    .description('Postgres database name'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_USER: Joi.string()
    .required()
    .description('Postgres username'),
  POSTGRES_PASSWORD: Joi.string()
    .allow('')
    .description('Postgres password')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  postgres: {
    db: envVars.POSTGRES_DB,
    port: envVars.POSTGRES_PORT,
    host: envVars.POSTGRES_HOST,
    user: envVars.POSTGRES_USER,
    password: envVars.POSTGRES_PASSWORD
  }
};

export default config;
