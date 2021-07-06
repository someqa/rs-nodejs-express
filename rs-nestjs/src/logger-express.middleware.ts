import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('http');
  use(req: Request, res: Response, next: () => void) {
    const { originalUrl: url, query, body } = req;
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        JSON.stringify({
          url,
          queryParams: JSON.stringify(query),
          body,
          statusCode,
        }),
      );
    });
    next();
  }
}
