import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from 'src/tasks/entities/task.entity';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), AuthenticationModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
