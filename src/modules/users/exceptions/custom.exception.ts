import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomExeption extends HttpException {
    constructor() {

        //feo : this is the message of exception
        super('feo', HttpStatus.URI_TOO_LONG)
    }
}

