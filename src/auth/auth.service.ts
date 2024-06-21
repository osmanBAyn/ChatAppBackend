import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private userService : UsersService, private jwtService : JwtService){}
    async signIn(email : string, password : string){
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            throw new NotFoundException("UserNotFound");
        }
        if(!bcrypt.compare(password, user.password)){
            throw new UnauthorizedException("Password wrong");
        }
        const payload = {sub : user.id, email : user.email};
        return{
            access_token : await this.jwtService.signAsync(payload)
        }

    }
}
