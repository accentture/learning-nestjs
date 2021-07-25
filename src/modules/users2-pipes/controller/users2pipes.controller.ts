import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { CreateUser2Dto } from '../dtos/create-user2.dto';
import { UpdateUser2Dto } from '../dtos/update.user2.dto';
import { CreateUser2Pipe } from '../pipes/create-user.pipe';
import { UpdateUser2Pipe } from '../pipes/update.user.pipe';
import { RestaurantPipe } from '../pipes/restaurant.pipe';
import { ApiTags } from '@nestjs/swagger';



/* 
    --the pipes works in context to query, params and body
*/
@ApiTags('users2pipes')
@Controller('users2pipes')
export class Users2pipesController {


    @Get(':id')
    //ParseIntPipe: to convert string to number, if this condition is not acomplished, it will return an error
    //the information will arrive to the pipe before to the route handler, it will prevent that findOne method was done
    async findOne(

        //@Param('id', ParseIntPipe ) id: number //we pass a class not an instance
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, //we can pass an instance if want o customize the build-in pipe

        @Query('limit', ParseIntPipe) limit: any,


    ) {
        return { id, limit }
    }

    @Get('/other/:uuid')

    //ParseUUIDPipe: the value expected is the uuid
    async findOther(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return { uuid }
    }

    @Get('/:id/custompipe')
    async customPipe(

        //body picks restaurant param
        //body only allows to pick a string
        @Body('restaurant', new RestaurantPipe()) query: any

    ) {
        console.log('process')
        return { query }
    }

    //automatically it will use UpdateUser2Pipe pipe
    @UsePipes(new UpdateUser2Pipe()) //method scoped
    @Put()
    updateUser2(@Body() updateUser2Dto: UpdateUser2Dto) {
        console.log('-------------------------updating')
        return { updateUser2Dto }
    }

    @Post()
    createUser(
        @Body(CreateUser2Pipe) createUser2Dto: CreateUser2Dto //parameter scoped
    ) {

    }

    @Delete()
    deleteUser(

        //using pipe that provide a value by default, it is executed before to pass the next pipe
        @Query('page', new DefaultValuePipe(459), ParseIntPipe) page: number,
    ) {
        console.log('------------the page', page)
    }
}


//-----------------------use pipes to validate and to convert data
