import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common';
import type { ApiError } from '@cvforge/types';
import type { Request, Response } from 'express';

/** Turns every thrown error into the shared ApiError shape and logs unexpected server errors. */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse<Response>();
    const req = http.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode >= 500) this.logUnexpected(exception, req, statusCode);

    let message = 'Internal server error';
    let details: unknown;
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else {
        const obj = body as { message?: string | string[] };
        message = Array.isArray(obj.message)
          ? 'Validation failed'
          : (obj.message ?? exception.message);
        if (Array.isArray(obj.message)) details = obj.message;
      }
    }

    const payload: ApiError = { success: false, statusCode, message, details };
    res.status(statusCode).json(payload);
  }

  /** Log diagnostic details without request bodies, query strings, or unbounded error metadata. */
  private logUnexpected(exception: unknown, req: Request, statusCode: number) {
    const err = exception instanceof Error ? exception : new Error(String(exception));
    const errorObject = typeof exception === 'object' && exception !== null ? exception : undefined;
    const code = errorObject && 'code' in errorObject ? errorObject.code : undefined;
    const codePart = typeof code === 'string' ? ` [${code.slice(0, 40)}]` : '';
    const keyLine =
      err.message
        .trim()
        .split('\n')
        .filter(Boolean)
        .pop()
        ?.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted email]')
        .slice(0, 300) ?? '';
    const frames = (err.stack ?? '')
      .split('\n')
      .filter((line) => line.trim().startsWith('at '))
      .slice(0, 6)
      .join('\n');

    // Use the route path only; originalUrl may contain sensitive query parameters.
    this.logger.error(
      `${req.method} ${req.path} -> ${statusCode} ${err.name}${codePart}: ${keyLine}`,
      frames,
    );
  }
}
