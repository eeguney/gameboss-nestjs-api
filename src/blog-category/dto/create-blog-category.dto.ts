import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateBlogCategoryDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(40)
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    info: string;
}
