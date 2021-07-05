import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from './entities/board.entity';
import Task from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
