import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async authenticate(@Body() credentials: CredentialsDto) {
    const { login, password } = credentials;
    const user = await this.userService.getAuthenticatedUser(login, password);
    if (!user)
      throw new HttpException('Forbidden - Authentication failed', 403);
    const { id } = user;
    return { userId: id, login };
  }
}
