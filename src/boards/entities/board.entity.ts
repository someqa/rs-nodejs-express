import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column as ColumnORM,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import Column from './column.entity';

@Entity()
class Board {
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
