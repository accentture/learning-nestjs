import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

//this module will be proveed to other modules

@Module({

    //it is one of the best ways accordy the documentation
    providers: [
        {
            provide: ConfigService,

            //every time that we import this module, we will have an instance of our service
            useValue: new ConfigService()
        }
    ],

    //when it was used from other module
    exports: [ConfigService]
})
export class ConfigModule { }
