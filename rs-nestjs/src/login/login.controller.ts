import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Controller('login')
export class LoginController {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async authenticate(@Body() credentials: CredentialsDto) {
    const { login, password } = credentials;
    const secretKey = this.configService.get('JWT_SECRET_KEY');
    if (!secretKey)
      throw new HttpException(
        'JWT secret key is not defined',
        HttpStatus.CONFLICT,
      );
    const user = await this.userService.getAuthenticatedUser(login, password);
    if (!user)
      throw new HttpException(
        'Forbidden - Authentication failed',
        HttpStatus.FORBIDDEN,
      );
    const { id } = user;
    const token = jwt.sign({ login, userId: id }, secretKey, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
    return { token };
  }
}
