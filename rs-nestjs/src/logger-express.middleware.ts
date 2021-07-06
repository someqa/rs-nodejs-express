import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    const { originalUrl: url, query, body } = req;
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.info(
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
