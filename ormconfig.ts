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

const typeOrmConfig = {
  type: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: parseInt(POSTGRES_PORT || '5432', 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['database/migrations/*.js'],
  cli: {
    migrationsDir: 'database/migrations',
  },
} as ConnectionOptions;

export default typeOrmConfig;
