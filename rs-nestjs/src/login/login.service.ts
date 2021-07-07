import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getUserByLogin(login: string) {
    const user = await this.userRepo.findOne({ login });
    return user;
  }
}
