import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column as ColumnORM,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Column from './column.entity';

export interface IBoard {
  id?: string;
  title?: string;
  columns?: Column[];
}

@Entity()
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id = uuid();

  @ColumnORM('text')
  title = 'Board title';

  @OneToMany(() => Column, (column) => column.board, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  columns!: Column[];
}

export default Board;
