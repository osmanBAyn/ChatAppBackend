import {IsEmail, IsNotEmpty} from "class-validator";

export class getUserDto{
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

}