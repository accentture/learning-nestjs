import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { CustomHttpGetExeptionFilter } from './filters/custom-http-get-exeption.filter';
import { CustomHttpExceptionFilter } from './filters/http-exeption.filter';
import { CheckSurnamesMiddleware } from './middlewares/check-surnames.middleware';
import { CheckMiddleware } from './middlewares/check.middleware';
import { UsersService } from './services/users.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService,




    //no works providers for these filters
    CustomHttpExceptionFilter,
    CustomHttpGetExeptionFilter,

    /* { provide: 'a', useClass: CustomHttpExceptionFilter },
    { provide: 'b', useClass: CustomHttpGetExeptionFilter } */


  ]
})
export class UserModule { }


//NestModule : it allow use middlewares
/* export class UserModule implements NestModule {
  configure(comsumer: MiddlewareConsumer) {
    comsumer
      .apply(CheckMiddleware, CheckSurnamesMiddleware)
      //.apply(CheckSurnamesMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
    //.forRoutes(UsersController) //we can use the controller also
  }
} */
