import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Global Before...');

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`Global After... ${Date.now() - now}ms`)),

            );
    }
}