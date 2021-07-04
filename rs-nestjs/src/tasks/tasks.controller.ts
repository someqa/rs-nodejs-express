import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HostParam,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/boards/:boardId/tasks/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@HostParam() boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create({ ...createTaskDto, boardId });
  }

  @Get()
  findAll(@HostParam() boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(
    @HostParam() boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, { ...updateTaskDto, boardId });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
