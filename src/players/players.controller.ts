import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Player } from './entity/player.entity';
import { Tournament } from 'src/tournaments/entity/tournament.entity';
import { Team } from 'src/teams/entity/team.entity';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private playerService: PlayersService) {}

    @ApiOkResponse({ type: Player, isArray: true })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'tournaments', required: false, description: "Show tournaments" })
    @Get()
    getAll(
        @Query('title') title?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('tournaments') tournaments: boolean = false,
    ): Promise<Player[]> {
        return this.playerService.findAll(title, page, limit, tournaments);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    getPlayerById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Player> {
        return this.playerService.findById(id);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/name/:name')
    getPlayerByTitle(@Param('name') name: string): Promise<Player> {
        return this.playerService.findByName(name);
    }

    @ApiParam({ name: 'playerId', required: true })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/tournaments/:playerId')
    getAllTournaments(@Param('playerId', ParseIntPipe) playerId?: number): Promise<Tournament[]> {
        return this.playerService.getAllTournaments(playerId);
    }

    @ApiCreatedResponse({ type: Player })
    @Post()
    createPlayer(@Body() body: Player): Promise<Player> {
        return this.playerService.createPlayer(body);
    }

    @ApiCreatedResponse({ type: Team })
    @ApiQuery({ name: 'playerId', required: false })
    @ApiQuery({ name: 'teamId', required: false })
    @Post('/player-to-team')
    addPlayerToTeam(@Query('playerId') playerId: number, @Query('teamId') teamId?: number): Promise<Team> {
        return this.playerService.addPlayerToTeam(playerId, teamId);
    }

    @ApiCreatedResponse({ type: Tournament })
    @ApiQuery({ name: 'playerId', required: false })
    @ApiQuery({ name: 'tournamentId', required: false })
    @Post('player-to-tournament')
    addPlayerToTournament(@Param('playerId') playerId?: number, @Param('tournamentId') tournamentId?: number): Promise<Tournament> {
        return this.playerService.addPlayerToTournament(playerId, tournamentId);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Patch('/:id')
    updatePlayerWithId(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Player,
    ): Promise<Player> {
        return this.playerService.updatePlayer(id, body);
    }
}
