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

    async findOrCreate(kakao_id: string, nickname: string, profile_image: string): Promise<Users> {
        let user = await this.usersRepository.findOne({where: {kakao_id}})

        if (!user) {
            user = this.usersRepository.create({kakao_id, nickname, profile_image})
            await this.usersRepository.save(user)
        }

        return user
    }


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
}
