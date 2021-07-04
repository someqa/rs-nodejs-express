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
    const existingUser=await userRepo.getByLogin(userData?.login);
    if (existingUser) return undefined;
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

  authenticate = async (userData: Partial<User>): Promise<void | User> => {
    const { login = '', password = '' } = userData;
    if (!login || !password) return undefined;
    const user = await userRepo.getByLogin(login);
    const match = user && (await compare(password, user.password));
    const authenticatedUser = match ? user : undefined;
    return authenticatedUser;
  };
}

export const userService = new UserService();
