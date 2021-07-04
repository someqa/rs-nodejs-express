import { v4 as uuid } from 'uuid';
import { Entity, Column as ColumnORM, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Column from '../columns/column.entity';
// import Task from '../tasks/task.entity';


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

  @OneToMany(()=>Column, column=>column.board, {cascade: true, onDelete:"CASCADE", onUpdate:"CASCADE"})
  @JoinColumn()
  columns!: Column[]
  /*
  @OneToMany(()=>Task, task=>task.board, {cascade: true, onDelete:"CASCADE", onUpdate:"CASCADE"})
  tasks!: Task[];
  */
  /*
  constructor(boardData: IBoard) {
    const { id = uuid(), title = 'Board', columns = [] } = boardData;
    this.id = id;
    this.title = title;
    this.columns = columns.map((columnData) => new Column(columnData));
  }
  */
}

export default Board;
