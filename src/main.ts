import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import path from 'path';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

async function bootstrap() {
  const { PORT, USE_FASTIFY } = process.env;
  const shouldUseFastify = USE_FASTIFY === 'true';
  const port = parseInt(PORT || '3000', 10);
  console.log('shouldUseFastify=', shouldUseFastify);
  const app = shouldUseFastify
    ? await NestFactory.create(AppModule, new FastifyAdapter())
    : await NestFactory.create(AppModule);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
