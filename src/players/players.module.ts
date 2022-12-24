import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from './entity/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournaments/entity/tournament.entity';
import { Team } from 'src/teams/entity/team.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Player]),
        TypeOrmModule.forFeature([Tournament]),
        TypeOrmModule.forFeature([Team]),
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
    exports: [PlayersService],
})
export class PlayersModule {}
