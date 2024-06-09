import {IsEmail, IsNotEmpty} from 'class-validator'
export class CreateUserDtoDto{

    @IsEmail()
    email : string
    @IsNotEmpty()
    password : string
    @IsNotEmpty()
    username : string
}