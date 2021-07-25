import { ApiProperty, ApiPropertyOptional, getSchemaPath, } from '@nestjs/swagger';
import { ApiTags, ApiBody } from '@nestjs/swagger';
//import { IsEmail, IsString } from 'class-validator';

class Car {
    @ApiProperty()
    model: string

    @ApiProperty()
    brand: string
}

export class Home {

    @ApiProperty()
    color: string

    @ApiProperty()
    extension: string

}


export class Dog {
    @ApiProperty()
    color: string

}


export class Chicken {
    @ApiProperty()
    color: string

}

type Pet = Dog | Chicken

export class CreateClientDto {


    @ApiProperty({
        //we can add descriptions to the property
        description: 'Field to create a client',
        default: 'Yurnero',
        example: 'feo',
        type: 'data type customized', // to set type

    })
    name: string

    @ApiProperty()
    hotel: number

    //@ApiPropertyOptional()
    @ApiProperty({ required: false })
    age: string

    @ApiProperty({ type: [Car] })
    cars: Car[]

    @ApiProperty({ isArray: true })
    homes: Home[]

    @ApiProperty({
        type: 'array',
        items: {
            oneOf: [
                { $ref: getSchemaPath(Chicken) },
                { $ref: getSchemaPath(Dog) },
            ],
        }


    })
    pets: Pet

    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(Chicken) },
            { $ref: getSchemaPath(Dog) },
        ],

    })
    combinationPets: Pet
}

// I stayed here:        Arrays