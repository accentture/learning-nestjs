import { HttpException, HttpStatus } from "@nestjs/common";

export class CarNotAllowedExeption extends HttpException {
    constructor() {

        super('', HttpStatus.UNAUTHORIZED)
    }
}

