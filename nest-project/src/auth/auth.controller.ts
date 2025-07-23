import { Controller, Redirect, UseGuards, HttpCode} from '@nestjs/common';
import { Post, Get, Res, Req, Query } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@/common/dto/api-response.dto'
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Redirect()
    @HttpCode(302)
    @Get('kakao')
    async kakaoCallback(@Query('code') code: string, @Res({ passthrough: true}) res: Response){
        try{
            const { accessToken, refreshToken } = await this.authService.kakaoLogin(code)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })

            return {
                url: `http://localhost:5173/godlife/#/oauth?token=${accessToken}`
            }

        }catch(error){
            console.error('에러발생 : ', error);
        }

    }


    @HttpCode(204)
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(){}


    @HttpCode(200)
    @Post('refresh')
    async refreshToken(@Req() req: any, @Res({ passthrough: true }) res: Response){
        try{
            const refreshToken = req.cookies['refreshToken'];
            const accessToken = await this.authService.getRefreshToken(refreshToken);
            return {
                success: true,
                statusCode: 200,
                message: 'Refresh token issued successfully',
                data: accessToken
            }
        }catch(error){
            console.error('ErrorMessage : ', error.message);
            return{
                success: false,
                statusCode: 500,
                message: 'Failed to issue refresh token',
                error: error?.message || 'Logout failed',
            }
        }

    }

    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response): ApiResponse<null>{
        try{
            res.clearCookie('refreshToken',{
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return {
                success: true,
                statusCode: 200,
                message: 'Logged out successfully'
            }
        }catch(err){
            return{
                success: false,
                statusCode: 500,
                message: 'Logout failed',
                error: err?.message || 'Logout failed',
            }
        }

    }
}