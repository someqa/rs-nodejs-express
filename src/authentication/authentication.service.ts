import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private readonly configService: ConfigService) {}

  validateToken(rawToken: string) {
    const secret = this.configService.get('JWT_SECRET_KEY');
    const tokenMatch = rawToken?.match(/(?<=Bearer )(.*)/g);
    if (!tokenMatch || tokenMatch.length !== 1 || !tokenMatch[0]) {
      return false;
    }
    const token = tokenMatch[0];
    try {
      jwt.verify(token, secret);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
