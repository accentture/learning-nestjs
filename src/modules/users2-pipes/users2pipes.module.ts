import { Module } from '@nestjs/common';
import { Users2pipesController } from './controller/users2pipes.controller';
import { CreateUser2Pipe } from './pipes/create-user.pipe';

@Module({
  controllers: [Users2pipesController],
  providers: [CreateUser2Pipe]
})
export class Users2pipesModule { }

