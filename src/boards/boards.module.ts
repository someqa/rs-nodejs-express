import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from './entities/board.entity';
import Task from 'src/tasks/entities/task.entity';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task]), AuthenticationModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
