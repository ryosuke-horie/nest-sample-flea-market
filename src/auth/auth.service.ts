import { CredentialsDto } from './dto/credentials.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private UserRepository: UserRepository,
        private JwtService: JwtService,
        ) {}

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return this.UserRepository.createUser(createUserDto);
    }

    async signIn(
        credentialsDto: CredentialsDto
        ): Promise<{ accessToken: string }> {
        const { username, password } = credentialsDto; // credentialsDtoを展開
        const user = await this.UserRepository.findOne({ username }); // usernameからユーザーを取得

        // パスワードの比較
        // bcryptにより、平文のパスワードとハッシュ値を比較することができる
        if (user && (await bcrypt.compare(password, user.password))) {  
            // JWTを生成
            const payload = { id: user.id, username: user.username };
            const accessToken = await this.JwtService.sign(payload); // 署名されたtoken
            return { accessToken };
        }
        // ユーザーが見つからない場合はエラーを返す
        throw new UnauthorizedException(
            'ユーザー名やパスワードを確認してください'
        );
    }
}
