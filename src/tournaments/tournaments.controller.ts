import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import {
    ApiOkResponse,
    ApiQuery,
    ApiNotFoundResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiParam,
} from '@nestjs/swagger';
import { Tournament } from './entity/tournament.entity';
import { Player } from 'src/players/entity/player.entity';
import { Team } from 'src/teams/entity/team.entity';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
    constructor(private tournamentsService: TournamentsService) {}

    @ApiOkResponse({ type: Tournament, isArray: true })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'teams', required: false, description: "Show teams" })  
    @ApiQuery({ name: 'players', required: false, description: "Show players" })  
    @Get()
    getAll(
        @Query('title') title?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('teams') teams: boolean = false,
        @Query('players') players: boolean = false,
    ): Promise<Tournament[]> {
        return this.tournamentsService.findAll(title, page, limit, teams, players);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    getTournamentById(
        @Param('id') id: string,
    ): Promise<Tournament> {
        return this.tournamentsService.findById(id);
    }

    @ApiParam({ name: 'tournamentId', required: true })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/players/:tournamentId')
    getAllPlayers(@Param('tournamentId') tournamentId?: string): Promise<Player[]> {
        return this.tournamentsService.getAllPlayers(tournamentId);
    }

    @ApiParam({ name: 'tournamentId', required: true })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/teams/:tournamentId')
    getAllTeams(@Param('tournamentId') tournamentId?: string): Promise<Team[]> {
        return this.tournamentsService.getAllTeams(tournamentId);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/title/:title')
    getTournamentByTitle(@Param('title') title: string): Promise<Tournament> {
        return this.tournamentsService.findByTitle(title);
    }

    @ApiCreatedResponse({ type: Tournament })
    @Post()
    createTournament(@Body() body: CreateTournamentDto): Promise<Tournament> {
        return this.tournamentsService.createTournament(body);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Patch('/:id')
    updateTournamentWithId(
        @Param('id') id: string,
        @Body() body: UpdateTournamentDto,
    ): Promise<Tournament> {
        return this.tournamentsService.updateTournament(id, body);
    }
}
