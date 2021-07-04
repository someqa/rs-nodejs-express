import { PartialType } from '@nestjs/mapped-types';
import Task from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(Task) {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string;
}
