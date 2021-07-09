import { CanActivate, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class JwtSecretGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const secretKey = this.configService.get('JWT_SECRET_KEY');
    if (!secretKey)
      throw new ConflictException('JWT Secret Key is not defined');
    return true;
  }
}
