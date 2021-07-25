
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { IsString, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CreateUser2Pipe implements PipeTransform {


    async transform(value: any, { metatype }: ArgumentMetadata) {

        console.log('------------plain object', value) //the value enter as a simple plain JS object
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const objects = plainToClass(metatype, value) //class-validator needs to use the validation decorators defined in our DTO
        const errors = await validate(objects)

        if (errors.length > 0) {
            throw new HttpException('You cannot pass because there is a pipe', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return value
    }

    //checking if the param is a native JavaScript type (these can't have validation decorators attached, so there's no reason to run them through the validation step).
    private toValidate(metatype: Function): boolean {

        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}



