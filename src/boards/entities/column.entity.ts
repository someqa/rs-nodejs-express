import {
  Entity,
  Column as ColumnORM,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
// eslint-disable-next-line import/no-cycle
import Board from './board.entity';

@Entity()
class Column {
  @PrimaryGeneratedColumn('uuid')
  id = uuid();

  @ColumnORM('text')
  title = 'column title';

  @ColumnORM({ type: 'int' })
  order = 0;

  @ManyToOne(() => Board, (board) => board.columns, {
    createForeignKeyConstraints: false,
  })
  board!: Board;
}

export default Column;
