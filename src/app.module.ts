import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/user.module';
import { CatsModule } from './modules/cats/cats.module';
import { ClientsModule } from './modules/clients-swagger/clients.module';
import { Users2pipesModule } from './modules/users2-pipes/users2pipes.module';
import { InterceptorsModule } from './modules/cars-interceptors/interceptors.module';

import { QueuesModule } from './modules/queues/queues.module';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from './modules/redis/redis.module';
import { Neo4jModule } from './modules/neo4j/neo4j.module';
import { ApiDrivineModule } from './modules/api-drivine/api-drivine.module';
/* 
    bull queue based in redis
*/

@Module({
    imports: [
        ConfigModule,
        //DatabaseModule,
        UserModule,
        CatsModule,
        ClientsModule,
        Users2pipesModule,
        InterceptorsModule,
        //QueuesModule,
        //RedisModule,
        Neo4jModule,

        //neo4j
        /* Neo4jModule.forRoot({
            scheme: 'neo4j',
            host: 'localhost',
            port: 7687,
            username: 'neo4j',
            password: 'ironman26',
            // database: '',

            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): Neo4jConfig => ({
                
            }),
        }), */

        ApiDrivineModule,
    ], //between imports are the dependencies that this module will use
    controllers: [AppController], //set of controllers for this module and must be instantiated
    providers: [AppService], //registering provider for this module, it will alow resolve the depencies of other elements, besides the instances be able to be shared between this module
})
export class AppModule {
    //static : it means that is not necessary to create an instance of this object, because always will be in memory
    static port: number | string;

    //  _ : underscore is used to indicate that it is a injected service
    constructor(private readonly _configService: ConfigService) {
        AppModule.port = this._configService.get(Configuration.PORT);
    }
}
