import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //this decorator means that is a request type GET
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
