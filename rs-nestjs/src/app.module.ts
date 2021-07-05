import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'ormconfig';
//import { Connection } from 'typeorm';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //to uncomment for migrations
  //constructor(private connection: Connection) {}
}
