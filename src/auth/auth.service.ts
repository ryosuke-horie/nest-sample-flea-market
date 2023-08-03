import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private UserRepository: UserRepository) {}

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return this.UserRepository.createUser(createUserDto);
    }
}
