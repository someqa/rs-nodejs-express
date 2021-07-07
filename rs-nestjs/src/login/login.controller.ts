import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async authenticate(@Body() credentials: CredentialsDto) {
    const { login, password } = credentials;
    if (!login || !password)
      throw new HttpException(
        'Forbidden - no (or empty) login or password provided',
        403,
      );
    const user = await this.loginService.getUserByLogin(login);
    if (!user || user.password != password)
      throw new HttpException('Forbidden - Authentication failed', 403);
    const { id } = user;
    return { userId: id, login };
  }
}
