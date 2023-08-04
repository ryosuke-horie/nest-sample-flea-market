import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // デフォルトの認証情報をJWTに設定
    JwtModule.register({ // JWTの設定
      secret: 'secretKey123', // 秘密鍵。本来は環境変数などに設定して外部にもらさないこと。
      signOptions: {
        expiresIn: 3600, // トークンの有効期限(秒)
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy, JwtAuthGuard], // JwtStrategyとJwtAuthGuardを他のモジュールで使えるようにする
})
export class AuthModule {}
