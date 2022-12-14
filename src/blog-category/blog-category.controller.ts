import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Query,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
} from '@nestjs/swagger/dist/decorators';
import { ApiTags } from '@nestjs/swagger/dist';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategory } from './entity/blog-category.entity';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@ApiTags('Blog Categories')
@Controller('blog-category')
export class BlogCategoryController {
    constructor(private blogCategoryService: BlogCategoryService) {}

    @ApiOkResponse({ type: BlogCategory, isArray: true })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get()
    getAll(
        @Query('title') title?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<BlogCategory[]> {
        return this.blogCategoryService.findAll(title, page, limit);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    getBlogCategoryById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<BlogCategory> {
        return this.blogCategoryService.findById(id);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/title/:title')
    getBlogCategoryByTitle(
        @Param('title') title: string,
    ): Promise<BlogCategory> {
        return this.blogCategoryService.findByTitle(title);
    }

    @ApiCreatedResponse({ type: BlogCategory })
    @Post()
    createBlogCategory(
        @Body() body: CreateBlogCategoryDto,
    ): Promise<BlogCategory> {
        return this.blogCategoryService.createBlogCategory(body);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Patch('/:id')
    updateBlogCategoryWithId(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateBlogCategoryDto,
    ): Promise<BlogCategory> {
        return this.blogCategoryService.updateBlogCategory(id, body);
    }
}
