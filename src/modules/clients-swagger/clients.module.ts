import { Module } from '@nestjs/common';
import { ClientsController } from './controller/clients.controller';

@Module({
  controllers: [ClientsController]
})
export class ClientsModule {}
