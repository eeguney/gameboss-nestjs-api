import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { BlogCategory } from 'src/blog-category/entity/blog-category.entity';
import { User } from 'src/users/entity/user.entity';
import { CreateTournamentDto } from './create-tournament.dto';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
    @ApiPropertyOptional()
    title?: string;

    @ApiPropertyOptional()
    slug?: string;

    @ApiPropertyOptional()
    text?: string;

    @ApiPropertyOptional()
    category?: BlogCategory;

    @ApiPropertyOptional()
    thumbnail?: string;

    @ApiPropertyOptional()
    user?: User;

    @ApiPropertyOptional()
    video?: string;
}
