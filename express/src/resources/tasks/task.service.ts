import { taskRepo } from './task.repository';
import Task from './task.entity';
import IService from '../Interfaces/IService';

class TaskService implements IService<Task> {
  getAll = async (boardId?: string): Promise<Task[]> =>
    taskRepo.getAll(boardId);

  get = async (id: string): Promise<Task | undefined> => taskRepo.get(id);

  create = async (taskData: Task): Promise<Task | undefined> =>
    taskRepo.create(taskData);

  update = async (taskData: Task): Promise<Task | undefined> => taskRepo.update(taskData);

  remove = async (id: string): Promise<void> => taskRepo.remove(id);
}

export const taskService = new TaskService();
