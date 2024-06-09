import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./schemas/user.schema";
import {CreateUserDtoDto} from "./dto/createUserDto.dto";
import {getUserDto} from "./dto/getUser.dto";
import {HashService} from "../hash/hash.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<User>, private hashService : HashService) {
    }
    async create(createUserDto:CreateUserDtoDto){
        const hash = await this.hashService.hash(createUserDto.password);
        const createdUser = new this.userModel({
            email: createUserDto.email,
            password: hash,
            username: createUserDto.username,
        });
        return createdUser.save();
    }
    async findUser(email:string){
        return this.userModel.find({email});
    }
    async findAll():Promise<User[]>{
        return this.userModel.find().exec();
    }
    async deleteAll(){
        return this.userModel.deleteMany();
    }
    async login(user:getUserDto){
        let found   = await this.findUser(user.email)
        if(!found){
            return {found: false, password : false}
        }
        console.log(found);
        const isPass = await this.hashService.compare(user.password, found[0].password);
        if(!isPass){
            return {found: true, password : false}
        }
        return {found: true, password : true}
    }
}
