import { hash, compare } from 'bcrypt';
import { IServiceBasic } from '../Interfaces/IService';
import { userRepo } from './user.repository';
import User, { IUserDTO } from './user.entity';

class UserService implements IServiceBasic<IUserDTO> {
  getAll = async (): Promise<IUserDTO[]> => {
    const users = await userRepo.getAll();
    return users.map(User.toResponse);
  };

  get = async (id: string): Promise<IUserDTO | undefined> => {
    const user = await userRepo.get(id);
    if (user) return User.toResponse(user);
    return undefined;
  };

  create = async (userData: User): Promise<IUserDTO | undefined> => {
    const password = await hash(userData?.password || 'pwd123!', 12);
    const createdUser = await userRepo.create({ ...userData, password });
    if (createdUser) return User.toResponse(createdUser);
    return undefined;
  };

  update = async (userData: User): Promise<IUserDTO | undefined> => {
    const password = await hash(userData?.password || 'pwd123!', 12);
    const updatedUser = await userRepo.update({ ...userData, password });
    if (updatedUser) return User.toResponse(updatedUser);
    return undefined;
  };

  remove = async (id: string): Promise<void> => userRepo.remove(id);

  authenticate = async (userData: Partial<User>):Promise<boolean> => {
    const { login = '', password = '' } = userData;
    if (!login || !password) return false;
    const user = await userRepo.getByLogin(login);
    const match = user && (await compare(password, user.password));
    return !!match;
  };
}

export const userService = new UserService();
