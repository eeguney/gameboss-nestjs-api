import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Blog } from './entity/blog.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogsRepository: Repository<Blog>,
    ) {}

    async findAll(
        title?: string,
        page?: number,
        limit?: number,
    ): Promise<Blog[]> {
        let blogs: Blog[];
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
            const foundedBlogs = await this.blogsRepository.find(options);
            if (foundedBlogs.length == 0) {
                throw new NotFoundException(
                    'There is no blog with that title...',
                );
            }
            blogs = foundedBlogs;
        } else {
            blogs = await this.blogsRepository.find(options);
        }
        if (blogs.length == 0) {
            throw new NotFoundException('There is no blogs...');
        }
        return blogs.map((blog) => plainToInstance(Blog, blog));
    }

    async findById(blogId: number): Promise<Blog> {
        const blog = await this.blogsRepository.findOne({
            where: { id: blogId },
        });
        if (!blog) {
            throw new NotFoundException(`Blog with id ${blogId} not found...`);
        }
        return blog;
    }

    async findByTitle(title: string): Promise<Blog> {
        const blog = await this.blogsRepository.findOne({
            where: { title },
        });
        if (!blog) {
            throw new NotFoundException(`Blog with id ${title} not found...`);
        }
        return blog;
    }

    async createBlog(blogData: CreateBlogDto): Promise<Blog> {
        const errors = await validate(blogData);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid blog data');
        }
        return await this.blogsRepository.save(blogData);
    }

    async updateBlog(id: number, blogData: UpdateBlogDto): Promise<void> {
        const blog = await this.blogsRepository.findOneBy({ id });
        if (!blog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }

        this.blogsRepository.merge(blog, blogData);
        const errors = await validate(blog);
        if (errors.length > 0) {
            throw new BadRequestException('Invalid blog data');
        }

        await this.blogsRepository.save(blog);
    }
}
