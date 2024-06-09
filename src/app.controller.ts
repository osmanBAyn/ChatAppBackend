import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Inject, Param, Post, Query,
  Req, Res,
  UseFilters
} from '@nestjs/common';
import { AppService } from './app.service';
import {UsersService} from "./users/users.service";
import {CreateUserDtoDto} from "./users/dto/createUserDto.dto";
import {Response} from "express";
import {getUserDto} from "./users/dto/getUser.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private usersService : UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("register")
  async register(@Body() user:CreateUserDtoDto,@Res() res : Response) {
    try{
      await this.usersService.create(user)
    }
    catch (error) {
      throw new HttpException({
        status : HttpStatus.CONFLICT,
        error : "User already exists"
      },HttpStatus.CONFLICT,{cause:error});
    }

    res.status(HttpStatus.CREATED).send({message:"User got created"});
  }
  @Get("login")
  async login(@Query() query:getUserDto, @Res() res: Response){
    const result = await this.usersService.login(query)
    console.log(result);
    if(!result.found) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "Cannot find user"
      }, HttpStatus.NOT_FOUND);
    }
    if(!result.password){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "User password is incorrect"
      },HttpStatus.BAD_REQUEST);
    }

    res.status(HttpStatus.OK);
    res.send(result)
  }
  @Get("delete")
  deleteMongo(){
    this.usersService.deleteAll().catch(val => {throw new HttpException("Can't delete", HttpStatus.BAD_REQUEST)});
  }
}
