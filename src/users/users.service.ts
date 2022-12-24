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

type UserDetails = {
    email: string;
    displayName: string;
};

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
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

    async createOrLogin(user: CreateUserDto): Promise<void> {
        const theUser = await this.usersRepository.findOne({
            where: { id: user.id },
        });
        if (!theUser) {
            console.log("user yok yeni oluşturulacak")
            this.createUser(user);
        }
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

    async findbyEmailOrUsername(displayName: string) {
        const user = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.displayName = :displayName', { displayName })
            .orWhere('users.email = :displayName', { displayName })
            .getOne();
        if (!user) {
            throw new NotFoundException(
                `User with username or email ${displayName} not found...`,
            );
        }
        return user;
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = userData.name;
        user.picture = userData.picture;
        user.googleId = userData.id;
        user.email = userData.email;
        user.password = userData.password;
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid user data');
        }
        await this.usersRepository.save(user);
        return user;
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        this.usersRepository.merge(user, userData);
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid user data');
        }

        return await this.usersRepository.save(user);
    }
}
