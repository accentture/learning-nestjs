import { ApiProperty, ApiPropertyOptional, } from '@nestjs/swagger';
import { ApiTags, ApiBody, ApiExtraModels } from '@nestjs/swagger';

export class GetClientDto {

    @ApiProperty()
    theNameClient: string

    @ApiProperty()
    nationality: number

    //@ApiPropertyOptional()
    @ApiProperty({ required: false })
    age: string


}

// I stayed here:        Arrays