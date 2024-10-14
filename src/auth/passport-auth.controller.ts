import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NotImplementedException, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';


@Controller('auth-v2')
export class PassportAuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: { username: string; password: string }) {
        throw new NotImplementedException();
    }


    @Get('me')
    getUserInfo() {
        throw new NotImplementedException();
    }

}
