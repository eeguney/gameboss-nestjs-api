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
import { BlogsService } from './blogs.service';
import { ApiTags } from '@nestjs/swagger/dist';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
} from '@nestjs/swagger/dist/decorators';
import { Blog } from './entity/blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) {}

    @ApiOkResponse({ type: Blog, isArray: true })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get()
    getAll(
        @Query('title') title?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Blog[]> {
        return this.blogsService.findAll(title, page, limit);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
        return this.blogsService.findById(id);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get('/title/:title')
    getBlogByTitle(@Param('title') title: string): Promise<Blog> {
        return this.blogsService.findByTitle(title);
    }

    @ApiCreatedResponse({ type: Blog })
    @Post()
    createBlog(@Body() body: CreateBlogDto): Promise<Blog> {
        return this.blogsService.createBlog(body);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Patch('/:id')
    updateBlogWithId(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateBlogDto,
    ): Promise<void> {
        return this.blogsService.updateBlog(id, body);
    }
}
