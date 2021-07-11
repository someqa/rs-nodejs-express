import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from 'src/tasks/entities/task.entity';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import Board from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task]), AuthenticationModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
