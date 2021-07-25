import { Module } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatService } from './services/cat.service';

@Module({
    controllers: [CatsController],
    providers: [CatService]
})
export class CatsModule { }
