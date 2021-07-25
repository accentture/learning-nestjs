import { IsString, IsEmail } from 'class-validator';

export class CreateUser2Dto {

    @IsString()
    fullName: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;
}