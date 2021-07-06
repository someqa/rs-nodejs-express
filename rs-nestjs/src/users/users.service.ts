import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from 'src/tasks/entities/task.entity';
//TODO - repository level - check if needed, implement if needed
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    const createdUser = await this.userRepo.save(newUser);
    return User.toResponse(createdUser);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map((it) => User.toResponse(it));
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne(id);
    return user && User.toResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto);
    const updatedUser = await this.userRepo.findOne({ id });
    return updatedUser && User.toResponse(updatedUser);
  }

  async remove(id: string) {
    await this.userRepo.delete(id);
    await this.taskRepo.update({ userId: id }, { userId: null });
  }
}
