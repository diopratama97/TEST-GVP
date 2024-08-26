import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException) // tangkap error
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      // ambil error dari httpexception
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      // amnil dari validasi data zod
      response.status(400).json({
        messsage: 'Validation Error',
        errors: exception.errors,
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
