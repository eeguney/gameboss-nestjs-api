import { Module } from '@nestjs/common';
import { TournamentCategoryService } from './tournament-category.service';
import { TournamentCategoryController } from './tournament-category.controller';
import { TournamentCategory } from './entity/tournament-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentCategory])],
  controllers: [TournamentCategoryController],
  providers: [TournamentCategoryService],
  exports: [TournamentCategoryService]
})
export class TournamentCategoryModule {}
