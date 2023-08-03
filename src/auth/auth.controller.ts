import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.authService.signUp(createUserDto);
    }
}
