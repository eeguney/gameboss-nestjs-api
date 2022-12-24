import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTournamentCategoryDto } from './create-tournament-category.dto';

export class UpdateTournamentCategoryDto extends PartialType(CreateTournamentCategoryDto) {
    @ApiPropertyOptional()
    title?: string;

    @ApiPropertyOptional()
    slug?: string;

    @ApiPropertyOptional()
    thumbnail?: string;

    @ApiPropertyOptional()
    info?: string;
}
