import { ApiProperty, ApiPropertyOptional, } from '@nestjs/swagger';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UserRole } from '../emuns/role';
//import { IsEmail, IsString } from 'class-validator';


class Home { }

export class CreateNamesClientDto {


    @ApiProperty()
    theNameClient: string

    // ----------------------------------------------- ENUMS AND SWAGGER
    @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] }) //if we want to set an enum we need set explicitly
    role: UserRole
}

// I stayed here:        Arrays