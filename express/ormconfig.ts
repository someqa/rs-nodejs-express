import { ConnectionOptions } from 'typeorm';
import config from './src/common/config';

const typeOrmConfig = {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['src/resources/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
export default typeOrmConfig;
