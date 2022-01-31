import {
    CacheInterceptor,
    CacheKey,
    CacheTTL,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';
import { IProfile } from './profile.user';

/* 
  --we can enable auto cache on the controller which will affect all 'Get' action methods inside of the controller
  --In the auto cache, the 'key' value for storing cache will use the route value as key.
  --if I use it, I will forced to use auto cache in all controllers
*/
//to use auto cache
@UseInterceptors(CacheInterceptor)
@Controller()
export class RedisAutoCaheController {
    fakeData: IProfile = {
        name: 'nestjs',
        email: 'nestjs@gmail.com',
    };

    profilePol: IProfile = {
        name: 'pol',
        email: 'pol@gmail.com',
    };

    @Get('profile-auto-cache')
    getProfileWithAutoCache() {
        /* 
          --Now to test that auto cache saved to our Redis store, I'm going to check for the 'key' value using the Redis CLI.
          --using cli
            docker exec -it rediscontainer redis-cli
            keys *
        */
        return this.fakeData;
    }

    @Get('profile-pol')
    @CacheKey('myCustomKey') //we can override key to save in redis store
    @CacheTTL(300) //we can override TTL
    getProfilePol() {
        return this.profilePol;
    }
}
