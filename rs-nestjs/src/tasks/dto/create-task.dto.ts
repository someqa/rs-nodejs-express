import { PartialType } from '@nestjs/mapped-types';
import Task from '../entities/task.entity';

export class CreateTaskDto extends PartialType(Task) {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string;
}
