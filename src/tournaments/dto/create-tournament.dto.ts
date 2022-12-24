import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { BlogCategory } from "src/blog-category/entity/blog-category.entity";
import { User } from "src/users/entity/user.entity";

export class CreateTournamentDto {
    @ApiProperty()
    @MinLength(10)
    @MaxLength(240)
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    @MinLength(10)
    text: string;

    @ApiPropertyOptional()
    thumbnail?: string;

    @ApiProperty()
    category: BlogCategory;

    @ApiProperty()
    video: string;

    @ApiProperty()
    user: User;
}
