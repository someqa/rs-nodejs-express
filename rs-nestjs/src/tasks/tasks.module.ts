import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './entities/task.entity';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthenticationModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
