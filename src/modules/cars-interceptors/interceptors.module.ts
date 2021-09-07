import { Module } from '@nestjs/common';
import { InterceptorController } from './controllers/interceptor.controller';

@Module({
  controllers: [InterceptorController]
})
export class InterceptorsModule {}
