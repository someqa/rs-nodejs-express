import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthenticationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const rawToken = req.get('Authorization');
    if (this.authService.validateToken(rawToken)) return true;
    else
      throw new HttpException('Unauthorized request', HttpStatus.UNAUTHORIZED);
  }
}
