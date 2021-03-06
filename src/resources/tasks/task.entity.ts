import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId?: string;
  columnId?: string;
}

@Entity()
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id = uuid();

  @Column('text')
  title = 'task title';

  @Column('int')
  order = 0;

  @Column('text')
  description = 'desc task';

  @Column({ type: 'uuid', nullable: true })
  userId!: string|null;

  @Column('uuid')
  boardId!: string;

  // TODO relationship
  @Column({type:'uuid', nullable: true})
  columnId!: string;
}

export default Task;
