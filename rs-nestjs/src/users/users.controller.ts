import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';

@Controller('users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user)
      throw new HttpException(
        'User creation failed - probably, there is a user with same login',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (user) return user;
    else throw new HttpException('No such user', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!id) throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    return this.usersService.remove(id);
  }
}
