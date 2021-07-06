import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'ormconfig';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
//import { Connection } from 'typeorm';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './logger-express.middleware';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  //to uncomment for migrations
  //constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
