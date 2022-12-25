import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiOkResponse, ApiQuery, ApiNotFoundResponse, ApiCreatedResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Team } from './entity/team.entity';
import { Tournament } from 'src/tournaments/entity/tournament.entity';
import { Player } from 'src/players/entity/player.entity';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

    @ApiOkResponse({ type: Team, isArray: true })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'players', required: false, description: "Show players" })
    @Get()
    getAll(
        @Query('title') title?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('players') players: boolean = false,
    ): Promise<Team[]> {
        return this.teamService.findAll(title, page, limit, players);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    getTeamById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Team> {
        return this.teamService.findById(id);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/name/:name')
    getTeamByTitle(@Param('name') name: string): Promise<Team> {
        return this.teamService.findByName(name);
    }

    @ApiParam({ name: 'teamId', required: true })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/players/:teamId')
    getAllPlayers(@Param('teamId') teamId?: number): Promise<Player[]> {
        return this.teamService.getAllPlayers(teamId);
    }

    @ApiParam({ name: 'teamId', required: true })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/tournaments/:teamId')
    getAllTournaments(@Param('teamId') teamId?: number): Promise<Tournament[]> {
        return this.teamService.getAllTournaments(teamId);
    }

    @ApiCreatedResponse({ type: Team })
    @Post()
    createTeam(@Body() body: Team): Promise<Team> {
        return this.teamService.createTeam(body);
    }

    @ApiCreatedResponse({ type: Team })
    @ApiQuery({ name: 'teamId', required: false })
    @ApiQuery({ name: 'tournamentId', required: false })
    @Post('/team-to-tournament')
    addTeamToTournament(@Query('teamId') teamId?: number, @Query('tournamentId') tournamentId?: string): Promise<Tournament> {
        return this.teamService.addTeamToTournament(teamId, tournamentId);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Patch('/:id')
    updateTeamWithId(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Team,
    ): Promise<Team> {
        return this.teamService.updateTeam(id, body);
    }
}
