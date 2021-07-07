import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Task from 'src/tasks/entities/task.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User, Task])],
  controllers: [LoginController],
  providers: [UsersService],
})
export class LoginModule {}
