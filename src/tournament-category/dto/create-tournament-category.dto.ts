import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength } from "class-validator";

export class CreateTournamentCategoryDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(40)
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    thumbnail: string;

    @ApiProperty()
    info: string;
}
