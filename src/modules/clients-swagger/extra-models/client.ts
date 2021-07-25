import { ApiProperty } from "@nestjs/swagger"

export class Client {
    @ApiProperty()
    theNameClient: string

    @ApiProperty()
    nationality: number

    //@ApiPropertyOptional()
    @ApiProperty({ required: false })
    age: string

}
