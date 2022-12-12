import { PartialType } from '@nestjs/swagger';
import { CreateBlogCategoryDto } from './create-blog-category.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBlogCategoryDto extends PartialType(CreateBlogCategoryDto) {
    @ApiPropertyOptional()
    title?: string;

    @ApiPropertyOptional()
    slug?: string;

    @ApiPropertyOptional()
    info?: string;
}
