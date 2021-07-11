import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req: Request | FastifyRequest = context.switchToHttp().getRequest();
    const { statusCode }: Response | FastifyReply = context
      .switchToHttp()
      .getResponse();
    const { url, method, params, query, body } = req;

    const logRecord = {
      date: Date.now(),
      url,
      method,
      params,
      query,
      body,
      statusCode,
    };

    return next.handle().pipe(tap(() => this.logger.info(logRecord)));
  }
}
