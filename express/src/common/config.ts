import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  MAX_RECONNECT_COUNT,
} = process.env;

const config = {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE: AUTH_MODE === 'true',
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST: POSTGRES_HOST || 'localhost',
  MAX_RECONNECT_COUNT,
};

export default config;
