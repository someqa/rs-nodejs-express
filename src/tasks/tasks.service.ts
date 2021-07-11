import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepo.create(createTaskDto);
    await this.taskRepo.save(newTask);
    return newTask;
  }

  findAll(boardId: string) {
    return this.taskRepo.find({ boardId });
  }

  findOne(id: string) {
    return this.taskRepo.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepo.update({ id }, { ...updateTaskDto });
    return this.taskRepo.findOne(id);
  }

  async remove(id: string) {
    await this.taskRepo.delete(id);
  }
}
