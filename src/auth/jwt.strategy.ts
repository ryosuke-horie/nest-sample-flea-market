import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearerトークンを取得
            ignoreExpiration: false, // 期限切れのトークンを拒否
            secretOrKey: 'secretKey123', // 秘密鍵
        })
    }

    async validate(payload: { id: number, username: string }): Promise<User> {
        const { id, username } = payload;
        const user = await this.userRepository.findOne({ id, username });

        // 認証に成功した場合はユーザー情報を返す
        if(user) {
            return user;
        }
        throw new UnauthorizedException();
    }
}