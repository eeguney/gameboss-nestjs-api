import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findAll(
        username?: string,
        page?: number,
        limit?: number,
    ): Promise<User[]> {
        let users: User[];
        const options: FindManyOptions = {};
        if (username) {
            options.where = {
                username,
            };
        }
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        if (username) {
            const foundedUsers = await this.usersRepository.find(options);
            if (foundedUsers.length == 0) {
                throw new NotFoundException(
                    'There is no user with that username...',
                );
            }
            users = foundedUsers;
        } else {
            users = await this.usersRepository.find(options);
        }
        if (users.length == 0) {
            throw new NotFoundException('There is no users...');
        }
        return users.map((user) => plainToInstance(User, user));
    }

    async findById(userId: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found...`);
        }
        return user;
    }

    async findbyEmailOrUsername(username: string) {
        const user = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.username = :username', { username })
            .orWhere('users.email = :username', { username })
            .getOne();
        if (!user) {
            throw new NotFoundException(
                `User with username or email ${username} not found...`,
            );
        }
        return user;
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = userData.username;
        user.fullname = userData.fullname;
        user.email = userData.email;
        user.password = userData.password;
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid user data');
        }
        await this.usersRepository.save(user);
        return user;
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        this.usersRepository.merge(user, userData);
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid user data');
        }

        await this.usersRepository.save(user);
    }
}
