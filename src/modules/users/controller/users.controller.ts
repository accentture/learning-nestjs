import { Body, Controller, Post, HttpException, HttpStatus, Get, Put, Delete, UnauthorizedException, UseFilters, Patch, ForbiddenException, ConflictException } from '@nestjs/common';
import { CustomExeption } from '../exceptions/custom.exception';
import { UsersService } from './../services/users.service';
import { CreateUserDto } from './create-user.dto';

import { CustomHttpExceptionFilter } from '../filters/http-exeption.filter';
import { CustomHttpGetExeptionFilter } from '../filters/custom-http-get-exeption.filter';
import { CustomGetExeption } from '../exceptions/custom-get.exeption';

@Controller('users')
@UseFilters(new CustomHttpExceptionFilter(), new CustomHttpGetExeptionFilter()) //we can use the filter and cover everything in this controller
//we can use many filter separed by comma
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post() //by default 201
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Get()
    async getUser() {

        //the response of this object can be a string or an object  
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'You cannot access to this resource'
        }, HttpStatus.FORBIDDEN)
    }
    @Get('testing-filter')
    async testingMyFilterWithGetMethod() {
        throw new CustomGetExeption()
    }
    @Get('nothing')
    async getNothing() {

    }
    @Put()
    async updateUser() {
        throw new CustomExeption()
    }

    @Delete()
    async deleteUser() {
        throw new UnauthorizedException() //UnauthorizedException: it inherits from HttpException
    }

    @Patch('/patch')
    //@UseFilters(new HttpExceptionFilter()) //joining our filter to our method
    async updateWithPatch() {
        throw new ConflictException()
    }

}
