import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import Task from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthenticationModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
