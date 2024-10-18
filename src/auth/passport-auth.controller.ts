import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NotImplementedException, Post, HttpCode, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { PassportLocalGuard } from './guards/passport-local.guard';


@Controller('auth-v2')
export class PassportAuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Body() input: { username: string; password: string }) {
        return 'success';
    }


    @Get('me')
    getUserInfo() {
        throw new NotImplementedException();
    }

}
