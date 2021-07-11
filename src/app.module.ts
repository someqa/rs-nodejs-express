import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'ormconfig';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Connection } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './logger-express.middleware';
import { GlobalExceptionFilter } from './global-exception.filter';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          level: 'error',
          filename: './logs/error.log',
        }),
        new winston.transports.File({
          level: 'info',
          filename: './logs/info.log',
        }),
      ],
    }),
    BoardsModule,
    TasksModule,
    UsersModule,
    LoginModule,
  ],
  controllers: [AppController],
  // to use DI inside filter
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  async configure(consumer: MiddlewareConsumer) {
    await this.connection.runMigrations();
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
