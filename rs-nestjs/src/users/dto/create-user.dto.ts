import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends PartialType(UpdateUserDto) {
  name: string;
  login: string;
  password: string;
}
