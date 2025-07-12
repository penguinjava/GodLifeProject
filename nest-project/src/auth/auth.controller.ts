import { Controller, Get, Query, Redirect, UseGuards, Req, HttpCode, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Redirect()
    @HttpCode(302)
    @Get('kakao')
    async kakaoCallback(@Query('code') code: string, @Res({ passthrough: true}) res: Response){
        const { accessToken, refreshToken } = await this.authService.kakaoLogin(code)
        
        res.cookie('refreshToken', refreshToken, {
           httpOnly: true,
           secure: true,
           sameSite: 'lax',
           maxAge: 1000 * 60 * 60 * 24 * 30,
        })
        
        return {
            url: `http://localhost:5173/godlife/#/oauth?token=${accessToken}`
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