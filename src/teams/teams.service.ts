import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Player } from 'src/players/entity/player.entity';
import { Tournament } from 'src/tournaments/entity/tournament.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { Team } from './entity/team.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private teamsRepository: Repository<Team>,
        @InjectRepository(Tournament)
        private tournamentsRepository: Repository<Tournament>,
    ) {}

    async findAll(
        title?: string,
        page?: number,
        limit?: number,
        players?: boolean,
    ): Promise<Team[]> {
        let teams: Team[];
        const options: FindManyOptions = {};
        options.relations = [];
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
            const foundedTeams = await this.teamsRepository.find(options);
            if (foundedTeams.length == 0) {
                throw new NotFoundException(
                    'There is no team with that title...',
                );
            }
            teams = foundedTeams;
        } else {
            teams = await this.teamsRepository.find(options);
        }
        if (teams.length == 0) {
            throw new NotFoundException('There is no teams...');
        }
        return teams.map((team) => plainToInstance(Team, team));
    }

    async findById(teamId: number): Promise<Team> {
        const team = await this.teamsRepository.findOne({
            where: { id: teamId },
        });
        if (!team) {
            throw new NotFoundException(`Team with id ${teamId} not found...`);
        }
        return team;
    }

    async getAllPlayers(teamId: number): Promise<Player[]> {
        const thatTeam = await this.teamsRepository.findOne({
            where: { id: teamId },
            relations: {
                players: true
            }
        });
        if (!thatTeam) {
            throw new NotFoundException(`Players with id ${teamId} not found...`);
        }
        return thatTeam.players;
    }

    async getAllTournaments(teamId: number): Promise<Tournament[]> {
        const thatTeam = await this.teamsRepository.findOne({
            where: { id: teamId },
            relations: {
                tournaments: true
            }
        });
        if (!thatTeam) {
            throw new NotFoundException(`Tournaments with id ${teamId} not found...`);
        }
        return thatTeam.tournaments;
    }

    
    async findByName(name: string): Promise<Team> {
        const team = await this.teamsRepository.findOne({
            where: { name },
        });
        if (!team) {
            throw new NotFoundException(`Team with id ${name} not found...`);
        }
        return team;
    }

    async createTeam(teamData: Team): Promise<Team> {
        const errors = await validate(teamData);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid team data');
        }
        return await this.teamsRepository.save(teamData);
    }

    async addTeamToTournament(
        teamId: number,
        tournamentId: number,
    ): Promise<Tournament> {
        const thatTeam = await this.teamsRepository.findOne({
            where: { id: teamId },
        });
        const thatTournament = await this.tournamentsRepository.findOne({
            where: { id: tournamentId },
            relations: ['teams'],
        });
        if (!thatTeam || !thatTournament) {
            throw new BadRequestException('Invalid information');
        }
        console.log(thatTournament);
        thatTournament.teams.push(thatTeam);
        return await this.tournamentsRepository.save(thatTournament);
    }

    async updateTeam(id: number, teamData: Team): Promise<Team> {
        const team = await this.teamsRepository.findOneBy({ id });
        if (!team) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        this.teamsRepository.merge(team, teamData);
        const errors = await validate(team);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid team data');
        }

        return await this.teamsRepository.save(team);
    }
}
