import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IProfile } from './profile.user';

@Controller()
export class RedisController {
    //fake data obtained from database
    fakeString = 'smartPyme team'; // it string will be used to store and get data from Redis

    fakeProfile: IProfile = {
        name: 'Jonathan',
        email: 'lordgelsin26@gmail.com',
    };

    //injecting cache instance
    //CACHE_MANAGER: it is a lookup for the provider to be injected wich means that it will inject the cache-store registered in CacheModule
    //Cache: it works with any cache
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    @Get('fetch-string')
    async getSimpleString() {
        //get: get fetch data from Redis store
        var value = await this.cacheManager.get('my-string'); //redis store only string

        //checking if exists data in cache
        if (value) {
            return {
                data: value,
                LoadFrom: 'redis-cache',
            };
        }
        //ttl: time to live
        await this.cacheManager.set(
            'my-string',
            this.fakeString /* { ttl: 300 } */,
        ); //setting data in Redis
        return {
            data: this.fakeString,
            loadFrom: 'fake database',
        };
    }

    @Get('fetch-object')
    async getFromCache() {
        await this.cacheManager.del('my-object'); //to remove a record from Redis database
        await this.cacheManager.reset(); //to clean entire Redis cache

        var data = await this.cacheManager.get<IProfile>('my-object');
        if (data) {
            return {
                data: data,
                loadsFrom: 'from redis cache',
            };
        }

        await this.cacheManager.set<IProfile>('my-object', this.fakeProfile, {
            ttl: 300,
        });

        return {
            data: this.fakeProfile,
            loadFrom: 'from fake data base',
        };
    }
}
