import { Injectable } from '@nestjs/common';

import { User } from '../models/user.entity';
import { CreateUserDto } from './../controller/create-user.dto';


@Injectable()
export class UsersService {
    async createUser(createUserDto: CreateUserDto) {
        const user = new User()
        user.names = createUserDto.names
        user.surnames = createUserDto.surnames
        user.age = createUserDto.age
        await user.save()

        return user
    }
}
