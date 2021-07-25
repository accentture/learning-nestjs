import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { CustomGetExeption } from '../exceptions/custom-get.exeption';

//@Catch() : to catch every exeption leave the @Catch empty
@Catch(CustomGetExeption)
@Injectable()
export class CustomHttpGetExeptionFilter implements ExceptionFilter {
    catch(exception: CustomGetExeption, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        //intercepting response
        response
            .status(status)
            .json({
                message: 'message to test my filter with test method',
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}