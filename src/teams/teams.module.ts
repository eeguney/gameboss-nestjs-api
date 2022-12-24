import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/team.entity';
import { Tournament } from 'src/tournaments/entity/tournament.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Team]), TypeOrmModule.forFeature([Tournament])],
    controllers: [TeamsController],
    providers: [TeamsService],
    exports: [TeamsService],
})
export class TeamsModule {}
