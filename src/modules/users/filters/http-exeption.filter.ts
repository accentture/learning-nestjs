import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomExeption } from '../exceptions/custom.exception';


/* export class CustomExeption extends HttpException {
  constructor() {

    //feo : this is the message of exception
    super('feo', HttpStatus.FOUND)
  }
} */

@Catch(CustomExeption) //it will found our custom exeption, and will add the custom JSON of this CustomHttpExceptionFilter
@Injectable()
export class CustomHttpExceptionFilter implements ExceptionFilter {

  //CustomExeption : it is the exception that will be processed
  catch(exception: CustomExeption, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //intercepting response
    response
      .status(status)
      .json({
        message: 'message to cover all the controller',
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
