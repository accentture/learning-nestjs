import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomGetExeption extends HttpException {
    constructor() {

        super('you was accepted', HttpStatus.ACCEPTED)
    }
}

