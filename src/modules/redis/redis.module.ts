import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { RedisAutoCaheController } from './redis-auto-cache.controller';
import { RedisController } from './redis.controller';

@Module({
    imports: [
        CacheModule.register({
            //redisStore represents the redis library
            store: redisStore, //redisStore take redis Store configuration for communication
            host: 'localhost',
            port: 5003,

            //ttl: time to live
            ttl: 300, //it configuration will affect to auto cache also
        }),
    ],
    controllers: [RedisController, RedisAutoCaheController],
    providers: [
        //to enables auto-cache
        //important if I enable auto-cache, redis cache is disabled
        /* {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        }, */
    ],
})
export class RedisModule {}

/* 
  depencies to work with redis
    npm install cache-manager
    npm install -D @types/cache-manager
    npm install cache-manager-redis-store --save
*/
