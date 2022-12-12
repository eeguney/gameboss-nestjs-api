import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORMCONFIG } from './config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(TYPEORMCONFIG), UsersModule],
})
export class AppModule {}
