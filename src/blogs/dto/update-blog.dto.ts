import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { BlogCategory } from 'src/blog-category/entity/blog-category.entity';
import { User } from 'src/users/entity/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
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
}
