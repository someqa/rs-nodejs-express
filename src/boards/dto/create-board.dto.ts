import { PartialType } from '@nestjs/mapped-types';
import Column from '../entities/column.entity';
import { UpdateBoardDto } from './update-board.dto';

export class CreateBoardDto extends PartialType(UpdateBoardDto) {
  title!: string;
  columns!: Column[];
}
