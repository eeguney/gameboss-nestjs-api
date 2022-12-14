import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { SessionSerializer } from './utils/Serializer';
import { AuthController } from './auth.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        SessionSerializer,
        AuthService
    ],
})
export class AuthModule {}
