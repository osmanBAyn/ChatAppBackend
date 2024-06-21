import {Injectable} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/createUser..dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
const saltRounds = 12;
@Injectable()
export class UsersService {
    constructor(private databaseService : DatabaseService){}
    async findAll(){
        return this.databaseService.user.findMany();
    }
    async findOne(id : number){
        return this.databaseService.user.findUnique({
            where:{
                id
            }
        })
    }
    async create(user : CreateUserDto){
        user.password  =await bcrypt.hash(user.password, saltRounds)
        return this.databaseService.user.create({
            data: user
        })
    }
    async update(user : UpdateUserDto, id : number){
        if(user.password){
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
        return this.databaseService.user.update({
            where:{
                id
            },
            data: user
        })
    }
    async delete(id : number){
        return this.databaseService.user.delete({
            where:{
                id
            }
        })
    }
}
