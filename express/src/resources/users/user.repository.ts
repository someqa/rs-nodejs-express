import { getRepository } from 'typeorm';
import IRepository from '../Interfaces/IRepository';
import User from './user.entity';
import Task from '../tasks/task.entity';

class UserRepository implements IRepository<User> {
  getAll = async (): Promise<User[]> => {
    const repo = getRepository(User);
    return repo.find();
  };

  get = async (id: string): Promise<User | undefined> => {
    const repo = getRepository(User);
    return repo.findOne({ id });
  };

  create = async (user: User): Promise<User | undefined> => {
    const repo = getRepository(User);
    const newUser = repo.create(user);
    await repo.insert(newUser);
    return newUser;
  };

  remove = async (id: string): Promise<void> => {
    const repo = getRepository(User);
    const taskRepo = getRepository(Task);
    await repo.delete(id);
    await taskRepo.update({ userId: id }, { userId: null });
  };

  update = async (user: User): Promise<User | undefined> => {
    const repo = getRepository(User);
    await repo.update(user.id, user);
    return repo.findOne(user.id);
  };

  getByLogin = async (login: string): Promise<User | void> => {
    const repo = getRepository(User);
    const user = await repo.findOne({ login });
    return user;
  };
}

export const userRepo = new UserRepository();
