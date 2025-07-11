import { Controller, Get, Query, Redirect, UseGuards, Req, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Redirect()
    @HttpCode(302)
    @Get('kakao')
    async kakaoCallback(@Query('code') code: string,){
        const token = await this.authService.kakaoLogin(code)
        return {
            url: `http://localhost:5173/godlife/#/oauth?token=${token}`
        }
    }


    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(@Req() req: { user: string}){
        const user = req.user;
        console.log(user);
        return user;
    }
}