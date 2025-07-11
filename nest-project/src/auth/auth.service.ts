import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "@/users/users.service";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly UsersService: UsersService
    ) {}

    async kakaoLogin(code: string): Promise<string> {
        try{
            const kakaoTokenRes = await axios.post(
                'https://kauth.kakao.com/oauth/token',
                new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: process.env.KAKAO_REST_API_KEY as string,
                    redirect_uri: process.env.KAKAO_REDIRECT_URI as string,
                    code,
                }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            )

            const kakaoAccessToken = kakaoTokenRes.data.access_token

            const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: { Authorization: `Bearer ${kakaoAccessToken}` },
            })

            const kakaoUserUser = userInfoRes.data
            const kakaoId = kakaoUserUser.id.toString()
            const nickname = kakaoUserUser.kakao_account.profile.nickname || '이름없음'
            const profileImage = kakaoUserUser.kakao_account.profile.profile_image_url || '/images/default-profile.png'

            const user = await this.UsersService.findOrCreate(kakaoId, nickname, profileImage)

            const payload = {
                id: user.kakao_id,
            }
            const uuidToken = uuidv4();

            const accessToken = this.jwtService.sign(payload, {expiresIn: '1h'});
            const refreshToken = this.jwtService.sign({id:uuidToken}, {expiresIn: '30d'});

            await this.UsersService.saveSessionToken(
                user.kakao_id,
                uuidToken,
                refreshToken,
                new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            );

            return JSON.stringify({ accessToken})
        } catch(err){
            console.error('카카오 로그인 실패:', err)
            throw new Error('카카오 로그인 중 오류 발생')
        }
    }


    async getUserFromToken(token: string) {
        const decoded = this.jwtService.verify(token)
        return {
            id: decoded.id,
            nickname: decoded.nickname,
            profileImg: decoded.profileImg
        }
    }
}