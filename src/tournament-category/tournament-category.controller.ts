import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TournamentCategoryService } from './tournament-category.service';
import { CreateTournamentCategoryDto } from './dto/create-tournament-category.dto';
import { UpdateTournamentCategoryDto } from './dto/update-tournament-category.dto';
import { ApiOkResponse, ApiQuery, ApiNotFoundResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TournamentCategory } from 'src/tournament-category/entity/tournament-category.entity';

@ApiTags('Tournament Categories')
@Controller('tournament-category')
export class TournamentCategoryController {
  constructor(private readonly tournamentCategoryService: TournamentCategoryService) {}
  @ApiOkResponse({ type: TournamentCategory, isArray: true })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  getAll(
      @Query('title') title?: string,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10
  ): Promise<TournamentCategory[]> {
      return this.tournamentCategoryService.findAll(title, page, limit);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  getTournamentCategoryById(
      @Param('id', ParseIntPipe) id: number,
  ): Promise<TournamentCategory> {
      return this.tournamentCategoryService.findById(id);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get('/title/:title')
  getTournamentCategoryByTitle(
      @Param('title') title: string,
  ): Promise<TournamentCategory> {
      return this.tournamentCategoryService.findByTitle(title);
  }

  @ApiCreatedResponse({ type: TournamentCategory })
  @Post()
  createTournamentCategory(@Body() body: CreateTournamentCategoryDto): Promise<TournamentCategory> {
      return this.tournamentCategoryService.createTournamentCategory(body);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Patch('/:id')
  updateTournamentCategoryWithId(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: UpdateTournamentCategoryDto,
  ): Promise<TournamentCategory> {
      return this.tournamentCategoryService.updateTournamentCategory(id, body);
  }
}
