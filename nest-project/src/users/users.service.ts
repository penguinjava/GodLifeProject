import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from '@/entities/users.entity'
import {Tokens} from '@/entities/tokens.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Tokens)
        private readonly tokensRepository: Repository<Tokens>,
    ) {
    }

    /**
     * 회원유무 확인
     * @param kakao_id
     * @param nickname
     * @param profile_image
     */
    async findOrCreate(kakao_id: string, nickname: string, profile_image: string): Promise<Users> {
        let user = await this.usersRepository.findOne({where: {kakao_id}})

        if (!user) {
            user = this.usersRepository.create({kakao_id, nickname, profile_image})
            await this.usersRepository.save(user)
        }

        return user
    }

    /**
     * 세션유지용으로 저장
     * @param userId
     * @param uuid
     * @param refreshToken
     * @param expiresAt
     */
    async saveSessionToken(
        userId: string,
        uuid: string,
        refreshToken: string,
        expiresAt: Date,
    ): Promise<Tokens> {
        const token = this.tokensRepository.create({
            user_id: userId,
            token_id: uuid,
            refresh_token: refreshToken,
            expired_at: expiresAt,
        });

        return await this.tokensRepository.save(token);
    }

    async findUserid(token_id: string): Promise<Tokens[]> {
        return await this.tokensRepository.find({where: {token_id}})
    }

    /**
     * 회원정보 불러오기
     * @param kakao_id
     */
    async findById(kakao_id: string): Promise<Users | null> {
        return await this.usersRepository.findOne({ where: { kakao_id } });
    }

}
