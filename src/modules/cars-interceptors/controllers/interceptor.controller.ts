import { Controller, Get, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { CarNotAllowedExeption } from '../exceptions/car-not-allowed.exception';
import { CarNotAllowedFilter } from '../filters/car-not-allowed.filter';
import { CheckBrandCarInterceptor } from '../interceptors/check-brand-card.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

@UseInterceptors(CheckBrandCarInterceptor, /* TransformInterceptor */)
@UseFilters(new CarNotAllowedFilter)
@Controller('interceptor')
export class InterceptorController {

    @Get()
    createCar() {
        var car = 'toyota'

        if (car === 'toyota') {
            throw new CarNotAllowedExeption()
        }

        return { message: 'create car, using interceptors' }
    }
}
