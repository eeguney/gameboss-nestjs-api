import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateTournamentCategoryDto } from './dto/create-tournament-category.dto';
import { UpdateTournamentCategoryDto } from './dto/update-tournament-category.dto';
import { TournamentCategory } from './entity/tournament-category.entity';

@Injectable()
export class TournamentCategoryService {
    constructor(
        @InjectRepository(TournamentCategory)
        private tournamentCategoryRepository: Repository<TournamentCategory>,
    ) {}

    async findAll(
        title?: string,
        page?: number,
        limit?: number,
    ): Promise<TournamentCategory[]> {
        let tournamentCategories: TournamentCategory[];
        const options: FindManyOptions = {};
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
            const foundedtournamentCategories =
                await this.tournamentCategoryRepository.find(options);
            if (foundedtournamentCategories.length == 0) {
                throw new NotFoundException(
                    'There is no tournament categories with that title...',
                );
            }
            tournamentCategories = foundedtournamentCategories;
        } else {
            tournamentCategories = await this.tournamentCategoryRepository.find(
                options,
            );
        }
        if (tournamentCategories.length == 0) {
            throw new NotFoundException('There is no tournament categories...');
        }
        return tournamentCategories.map((tournamentCategory) =>
            plainToInstance(TournamentCategory, tournamentCategory),
        );
    }

    async findById(TournamentCategoryId: number): Promise<TournamentCategory> {
        const TournamentCategory =
            await this.tournamentCategoryRepository.findOne({
                where: { id: TournamentCategoryId },
            });
        if (!TournamentCategory) {
            throw new NotFoundException(
                `Tournament category with id ${TournamentCategoryId} not found...`,
            );
        }
        return TournamentCategory;
    }

    async findByTitle(title: string): Promise<TournamentCategory> {
        const TournamentCategory =
            await this.tournamentCategoryRepository.findOne({
                where: { title },
            });
        if (!TournamentCategory) {
            throw new NotFoundException(
                `Tournament category with id ${title} not found...`,
            );
        }
        return TournamentCategory;
    }

    async createTournamentCategory(
        TournamentCategoryData: CreateTournamentCategoryDto,
    ): Promise<TournamentCategory> {
        const errors = await validate(TournamentCategoryData);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid tournament category data');
        }
        return await this.tournamentCategoryRepository.save(
            TournamentCategoryData,
        );
    }

    async updateTournamentCategory(
        id: number,
        TournamentCategoryData: UpdateTournamentCategoryDto,
    ): Promise<TournamentCategory> {
        const TournamentCategory =
            await this.tournamentCategoryRepository.findOneBy({
                id,
            });
        if (!TournamentCategory) {
            throw new NotFoundException(
                `Tournament category with id ${id} not found`,
            );
        }

        this.tournamentCategoryRepository.merge(
            TournamentCategory,
            TournamentCategoryData,
        );
        const errors = await validate(TournamentCategory);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid tournament category data');
        }
        return await this.tournamentCategoryRepository.save(TournamentCategory);
    }
}
