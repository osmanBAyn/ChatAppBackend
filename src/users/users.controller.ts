import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/createUser..dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UsersController {
    constructor(private userService : UsersService){}
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id : number){
        return this.userService.findOne(id);
    }
    @Get()
    findAll(){
        return this.userService.findAll();
    }
    @Post()
    create(@Body() user : CreateUserDto){
        return this.userService.create(user);
    }
    @Patch(":id")
    update(@Body() user : UpdateUserDto, @Param("id", ParseIntPipe) id : number){
        return this.userService.update(user, id);
    }
    @Delete(":id")
    delete(@Param("id",ParseIntPipe) id : number){
        return this.userService.delete(id);
    }
}
