import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Team } from 'src/teams/entity/team.entity';
import { Tournament } from 'src/tournaments/entity/tournament.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Player } from './entity/player.entity';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player)
        private playersRepository: Repository<Player>,
        @InjectRepository(Team)
        private teamsRepository: Repository<Team>,
        @InjectRepository(Tournament)
        private tournamentsRepository: Repository<Tournament>,
    ) {}

    async findAll(
        title?: string,
        page?: number,
        limit?: number,
        tournaments?: boolean,
    ): Promise<Player[]> {
        let players: Player[];
        const options: FindManyOptions = {};
        options.relations = [];
        if (tournaments) {
            options.relations.push('tournaments')
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
            const foundedPlayers = await this.playersRepository.find(options);
            if (foundedPlayers.length == 0) {
                throw new NotFoundException(
                    'There is no player with that title...',
                );
            }
            players = foundedPlayers;
        } else {
            players = await this.playersRepository.find(options);
        }
        if (players.length == 0) {
            throw new NotFoundException('There is no players...');
        }
        return players.map((player) => plainToInstance(Player, player));
    }

    async findById(playerId: number): Promise<Player> {
        this.playersRepository.insert;
        const player = await this.playersRepository.findOne({
            where: { id: playerId },
        });
        if (!player) {
            throw new NotFoundException(
                `Player with id ${playerId} not found...`,
            );
        }
        return player;
    }

    async findByName(name: string): Promise<Player> {
        const player = await this.playersRepository.findOne({
            where: { name },
        });
        if (!player) {
            throw new NotFoundException(`Player with id ${name} not found...`);
        }
        return player;
    }

    async getAllTournaments(playerId: number): Promise<Tournament[]> {
        const thatPlayer = await this.teamsRepository.findOne({
            where: { id: playerId },
            relations: {
                tournaments: true
            }
        });
        if (!thatPlayer) {
            throw new NotFoundException(`Tournament with id ${playerId} not found...`);
        }
        return thatPlayer.tournaments;
    }

    async createPlayer(playerData: Player): Promise<Player> {
        const errors = await validate(playerData);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid player data');
        }
        return await this.playersRepository.save(playerData);
    }

    async addPlayerToTeam(playerId: number, teamId: number): Promise<Team> {
        const thatPlayer = await this.playersRepository.findOne({
            where: { id: playerId },
        });
        const thatTeam = await this.teamsRepository.findOne({
            where: { id: teamId },
            relations: ['players']
        });
        if (!thatPlayer || !thatTeam) {
            throw new BadRequestException('Invalid information');
        }
        thatTeam.players.push(thatPlayer);
        return await this.teamsRepository.save(thatTeam);
    }

    async addPlayerToTournament(playerId: number, tournamentId: number): Promise<Tournament> {
        const thatPlayer = await this.playersRepository.findOne({
            where: { id: playerId },
        });
        const thatTournament = await this.tournamentsRepository.findOne({
            where: { id: tournamentId },
            relations: ['players']
        });
        if (!thatPlayer || !thatTournament) {
            throw new BadRequestException('Invalid information');
        }
        thatTournament.players.push(thatPlayer);
        return await this.tournamentsRepository.save(thatTournament);
    }

    async updatePlayer(id: number, playerData: Player): Promise<Player> {
        const player = await this.playersRepository.findOneBy({ id });
        if (!player) {
            throw new NotFoundException(`Player with id ${id} not found`);
        }

        this.playersRepository.merge(player, playerData);
        const errors = await validate(player);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid player data');
        }

        return await this.playersRepository.save(player);
    }
}
