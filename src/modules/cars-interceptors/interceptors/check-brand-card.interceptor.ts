import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CarNotAllowedExeption } from '../exceptions/car-not-allowed.exception';

@Injectable()
export class CheckBrandCarInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();

    const myResult = next
      .handle()
      .pipe(
        //tap(() => console.log(`After... ${Date.now() - now}ms`)),


        //with tab
        //tap((result) => console.log(result)),


        //with error
        catchError(err => of(err)),


        //with map
        //map(data => console.log('-----------------data', data))
      );
    myResult.subscribe(theError => console.log(theError))

    return next
      .handle()
      .pipe(
        //tap(() => console.log(`After... ${Date.now() - now}ms`)),


        //with tab
        //tap((result) => console.log(result)),


        //with error
        catchError(err => throwError(new CarNotAllowedExeption())),


        //with map
        //map(data => console.log('-----------------data', data))
      );
  }
}