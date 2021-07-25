
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { ObjectSchema } from 'joi';

@Injectable()
export class UpdateUser2Pipe implements PipeTransform {
    constructor(
        //private schema: ObjectSchema //I could not pass a schema
    ) { }

    //value : in this case pick value of a DTO
    transform(value: any, metadata: ArgumentMetadata) {

        throw new HttpException('You cannot pass because they eare a pipe', HttpStatus.UNPROCESSABLE_ENTITY)

        console.log('----------------------pipe ', value, metadata)
        return value
    }
}



