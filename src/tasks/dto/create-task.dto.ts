import { PartialType } from '@nestjs/mapped-types';
import { UpdateTaskDto } from './update-task.dto';

export class CreateTaskDto extends PartialType(UpdateTaskDto) {
  title!: string;
  order!: number;
  description!: string;
  userId!: string | null;
  columnId!: string;
}
