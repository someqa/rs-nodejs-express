import Column from '../entities/column.entity';

export class UpdateBoardDto {
  id: string;
  title: string;
  columns: Column[];
}
