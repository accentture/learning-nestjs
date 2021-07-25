import { Body, Controller, Get, HttpCode, Res, Req, Param, Post } from '@nestjs/common';
import { response, Request } from 'express'
import { CreateUser2Dto } from 'src/modules/users2-pipes/dtos/create-user2.dto';
import { CreateUser2Pipe } from 'src/modules/users2-pipes/pipes/create-user.pipe';
import { Cat } from '../services/cat.interface';
import { CatService } from '../services/cat.service';
import { CreateCatDto } from './create-cat.dto';

//@Controller({ host: 'admin.example.com' }) //it is possible to pass a subdomain to the controller to ensure the match
@Controller('cats')
export class CatsController {

    constructor(private catsService: CatService) {

    }


    @Get('all')
    @HttpCode(202) //http code by default is 200, except for post = 201
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get('create')

    //other way to send response using express library
    findOne(@Res() response, @Req() req: Request, @Body() createCatDto: CreateCatDto) { //other way to acces to body
        const { names } = req.body

        this.catsService.create(createCatDto)

        return response.status(205).send({ message: 'find one', createCatDto })
    }


    @Get('parameters/:id/:id2')     //passing token of param to the decorator
    parameterOfPath(@Param() params, @Param('id2') id2: string) {
        return { message: params.id, id2 }
    }

    @Post()
    usingPipeFromAnotherModule(@Body(CreateUser2Pipe) createUser2Dto: CreateUser2Dto) {
        console.log('----using pipe from other module', createUser2Dto)
    }
}
