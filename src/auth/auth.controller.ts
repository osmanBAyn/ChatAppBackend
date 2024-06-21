import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserLoginDto} from './dto/userLogin.dto'
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Post('login')
    signIn(@Body() user : UserLoginDto){
        return this.authService.signIn(user.email, user.password);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req ){
        return req.user;
    }
}
