import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Player } from 'src/players/entity/player.entity';
import { Team } from 'src/teams/entity/team.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entity/tournament.entity';

@Injectable()
export class TournamentsService {
    constructor(
        @InjectRepository(Tournament)
        private tournamentsRepository: Repository<Tournament>,
    ) {}

    async findAll(
        title?: string,
        page?: number,
        limit?: number,
        teams?: boolean,
        players?: boolean,
    ): Promise<Tournament[]> {
        let tournaments: Tournament[];
        const options: FindManyOptions = {};
        options.relations = [];
        if (teams) {
            options.relations.push('teams')
        }
        if (players) {
            options.relations.push('players')
        }
        if (title) {
            options.where = {
                title,
            };
        }
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        if (title) {
            const foundedTournaments = await this.tournamentsRepository.find(
                options,
            );
            if (foundedTournaments.length == 0) {
                throw new NotFoundException(
                    'There is no tournament with that title...',
                );
            }
            tournaments = foundedTournaments;
        } else {
            tournaments = await this.tournamentsRepository.find(options);
        }
        if (tournaments.length == 0) {
            throw new NotFoundException('There is no tournaments...');
        }
        return tournaments.map((tournament) =>
            plainToInstance(Tournament, tournament),
        );
    }

    async findById(tournamentId: number): Promise<Tournament> {
        const tournament = await this.tournamentsRepository.findOne({
            where: { id: tournamentId },
        });
        if (!tournament) {
            throw new NotFoundException(
                `Tournament with id ${tournamentId} not found...`,
            );
        }
        return tournament;
    }

    async getAllPlayers(tournamentId: number): Promise<Player[]> {
        const thatTournament = await this.tournamentsRepository.findOne({
            where: { id: tournamentId },
             relations: {
                players: true
            }
        });
        if (!thatTournament) {
            throw new NotFoundException(`Players with id ${tournamentId} not found...`);
        }
        return thatTournament.players;
    }

    async getAllTeams(tournamentId: number): Promise<Team[]> {
        const thatTournament = await this.tournamentsRepository.findOne({
            where: { id: tournamentId },
            relations: {
                teams: true
            }
        });
        if (!thatTournament) {
            throw new NotFoundException(`Teams with id ${tournamentId} not found...`);
        }
        return thatTournament.teams;
    }

    async findByTitle(title: string): Promise<Tournament> {
        const tournament = await this.tournamentsRepository.findOne({
            where: { title },
        });
        if (!tournament) {
            throw new NotFoundException(
                `Tournament with id ${title} not found...`,
            );
        }
        return tournament;
    }

    async createTournament(
        tournamentData: CreateTournamentDto,
    ): Promise<Tournament> {
        const errors = await validate(tournamentData);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid tournament data');
        }
        return await this.tournamentsRepository.save(tournamentData);
    }

    async updateTournament(
        id: number,
        tournamentData: UpdateTournamentDto,
    ): Promise<Tournament> {
        const tournament = await this.tournamentsRepository.findOneBy({ id });
        if (!tournament) {
            throw new NotFoundException(`Tournament with id ${id} not found`);
        }

        this.tournamentsRepository.merge(tournament, tournamentData);
        const errors = await validate(tournament);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid tournament data');
        }

        return await this.tournamentsRepository.save(tournament);
    }
}
