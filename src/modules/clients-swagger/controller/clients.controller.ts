import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';

import { CreateClientDto } from '../dto/create-cliet.dto';
import { CreateNamesClientDto } from '../dto/create-names-client.dto';
import { UserRole } from '../emuns/role';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {

    @Post()
    async createClient(
        @Body() createClientDto: CreateClientDto
    ) {

    }

    @ApiBody({
        type: [CreateNamesClientDto] //to recognize metadata about generics or interfaces
    })
    @Post('names-client')
    async createNameClient(
        @Body() createNamesClientDto: CreateNamesClientDto[]
    ) {

    }

    @Get()
    async getClient() {

    }

    // ---------------------------------------------ENUMS AND SWAGGER
    //very usefull for query
    @ApiQuery({ name: 'role', enum: UserRole })
    @Get('role')
    async filterByRole(
        @Query('role') role: UserRole = UserRole.User


    ) {
        console.log('---------------the role', role)
    }
}
