import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import * as jwt from 'jsonwebtoken';
import { LoginGuard } from './login.guard';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtSecretGuard } from './jwtsecret.guard';

@Controller('login')
@UseGuards(JwtSecretGuard, LoginGuard)
export class LoginController {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  @Post()
  async login(@Body() credentials: CredentialsDto) {
    const secretKey = this.configService.get('JWT_SECRET_KEY');
    const { login } = credentials;
    const user = await this.userService.getByLogin(login);
    if (user) {
      const { id } = user;
      const token = jwt.sign({ login, userId: id }, secretKey);
      return { token };
    }
  }
}
