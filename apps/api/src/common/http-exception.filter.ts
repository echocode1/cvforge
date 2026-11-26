import { Catch, HttpException, HttpStatus, type ArgumentsHost, type ExceptionFilter } from '@nestjs/common';
import type { ApiError } from '@cvforge/types';
import type { Response } from 'express';

/** Turns every thrown error into the shared ApiError shape. */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let details: unknown;
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else {
        const obj = body as { message?: string | string[] };
        message = Array.isArray(obj.message) ? 'Validation failed' : (obj.message ?? exception.message);
        if (Array.isArray(obj.message)) details = obj.message;
      }
    }

    const payload: ApiError = { success: false, statusCode, message, details };
    res.status(statusCode).json(payload);
  }
}
