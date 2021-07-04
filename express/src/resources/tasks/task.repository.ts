import { getRepository } from 'typeorm';
import IRepository from '../Interfaces/IRepository';
import Task from './task.entity';

class TaskRepository implements IRepository<Task> {
  getAll = async (id?: string): Promise<Task[]> => {
    const repo = getRepository(Task);
    return repo.find({ boardId: id });
  };

  get = async (id: string): Promise<Task | undefined> => {
    const repo = getRepository(Task);
    return repo.findOne({ id });
  };

  create = async (task: Task): Promise<Task | undefined> => {
    const repo = getRepository(Task);
    const newTask = repo.create(task);
    await repo.insert(newTask);
    return newTask;
  };

  remove = async (id: string): Promise<void> => {
    const repo = getRepository(Task);
    await repo.delete(id);
  };

  update = async (task: Task): Promise<Task | undefined> => {
    const repo = getRepository(Task);
    await repo.update({ id: task.id }, { ...task });
    return repo.findOne(task.id);
  };
}

export const taskRepo = new TaskRepository();
