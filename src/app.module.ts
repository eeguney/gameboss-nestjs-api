import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORMCONFIG } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TournamentCategoryModule } from './tournament-category/tournament-category.module';

@Module({
    imports: [TypeOrmModule.forRoot(TYPEORMCONFIG), UsersModule, BlogsModule, BlogCategoryModule, TournamentsModule, TournamentCategoryModule],
})
export class AppModule {}
