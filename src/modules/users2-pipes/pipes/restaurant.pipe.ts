
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class RestaurantPipe implements PipeTransform {

    //value : in this case pick value of body (restaurant)
    transform(value: any, metadata: ArgumentMetadata) {

        if (value !== 'diana') {
            throw new HttpException('This person is not diana', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return value //it is important to return the value, to continue the process in the controller
    }
}



