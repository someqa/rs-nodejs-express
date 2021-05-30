import dB from '../../common/inMemoryDb.js';
import IRepository from '../Interfaces/IRepository.js';
import User from './user.model.js';

class UserRepository implements IRepository<User> {
  getAll = async (): Promise<User[]> => dB.getAllUsers();

  get = async (id: string): Promise<User | undefined> => dB.getUser(id);

  create = async (user: User): Promise<User | undefined> => dB.createUser(user);

  remove = async (id: string): Promise<void> => {
    dB.removeUser(id);
    dB.removeUserFromTasks(id);
  };

  update = async (user: User): Promise<User | undefined> => dB.updateUser(user);
}

export const userRepo = new UserRepository();
