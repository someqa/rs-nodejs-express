import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

//TODO - set syncronize to false, adjust .env to use docker db
const typeOrmConfig = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  //migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;

export default typeOrmConfig;
