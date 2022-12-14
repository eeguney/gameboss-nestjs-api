import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

type UserDetails = {
    email: string;
    displayName: string;
};

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async validateUser(details: UserDetails) {
        const user = await this.userRepository.findOne({
            where: { email: details.email },
        });
        if (user) return user;
        const newUser = this.userRepository.create(details);
        return this.userRepository.save(newUser);
    }

    async findUser(id: number) {
        return await this.userRepository.findOneBy({ id });
    }
}
