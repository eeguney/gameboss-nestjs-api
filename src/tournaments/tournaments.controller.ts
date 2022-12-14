import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
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
} from '@nestjs/swagger';
import { Tournament } from './entity/tournament.entity';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
    constructor(private tournamentsService: TournamentsService) {}

    @ApiOkResponse({ type: Tournament, isArray: true })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get()
    getAll(
        @Query('title') title?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Tournament[]> {
        return this.tournamentsService.findAll(title, page, limit);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    getTournamentById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Tournament> {
        return this.tournamentsService.findById(id);
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
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateTournamentDto,
    ): Promise<Tournament> {
        return this.tournamentsService.updateTournament(id, body);
    }
}
