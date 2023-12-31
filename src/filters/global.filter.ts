import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    let statusCode: number, message: string, reason: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      reason = exception.name;
      message = (exception.getResponse() as any).message;
    } else if (exception instanceof Error) {
      exception;

      statusCode = 400;
      reason = exception.name;
      message = exception.message;
    }
    Logger.error(`${request.originalUrl} \n ${exception} \n`);
    statusCode ||= 500;
    if (Array.isArray(message)) message = message.join(';');
    message ||= 'Internal Sever Error';
    reason ||= 'unknown';
    response.status(statusCode).json({ statusCode, reason, message });
  }
}
