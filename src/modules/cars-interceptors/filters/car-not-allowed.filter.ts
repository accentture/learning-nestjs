import { ExceptionFilter, Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { CarNotAllowedExeption } from '../exceptions/car-not-allowed.exception';

@Catch(CarNotAllowedExeption)
@Injectable()
export class CarNotAllowedFilter implements ExceptionFilter {
    catch(exception: CarNotAllowedExeption, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        //intercepting response
        response
            .status(status)
            .json({
                message: 'toyota car is not allowed',
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}