import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { QueryFailedError } from 'typeorm';
import { Logger } from 'winston';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: { stack: string | undefined }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response | FastifyReply = ctx.getResponse();
    const request: Request | FastifyRequest = ctx.getRequest();
    const { url, query, body } = request;
    // logging
    this.logger.error({
      date: Date.now(),
      url,
      query,
      body,
      errorStack: exception.stack,
    });
    // generating response
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    response.status(status).send({
      errorData: errorMessage,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
    // shutdown if exception's uncaught (only HttpException are thrown from modules, QueryFailerErrors can also be handled)
    const isExceptionCaught =
      exception instanceof HttpException ||
      exception instanceof QueryFailedError;
    if (!isExceptionCaught) process.exit(1);
  }
}
