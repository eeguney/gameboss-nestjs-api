import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BlogCategory } from './entity/blog-category.entity';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@Injectable()
export class BlogCategoryService {
  constructor(
      @InjectRepository(BlogCategory)
      private readonly blogCategoryRepository: Repository<BlogCategory>,
  ) {}

  async findAll(
      title?: string,
      page?: number,
      limit?: number,
  ): Promise<BlogCategory[]> {
      let blogCategories: BlogCategory[];
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
          const foundedBlogCategories = await this.blogCategoryRepository.find(options);
          if (foundedBlogCategories.length == 0) {
              throw new NotFoundException(
                  'There is no blog categories with that title...',
              );
          }
          blogCategories = foundedBlogCategories;
      } else {
        blogCategories = await this.blogCategoryRepository.find(options);
      }
      if (blogCategories.length == 0) {
          throw new NotFoundException('There is no blog categories...');
      }
      return blogCategories.map((blogCategory) => plainToInstance(BlogCategory, blogCategory));
  }

  async findById(blogCategoryId: number): Promise<BlogCategory> {
      const blogCategory = await this.blogCategoryRepository.findOne({
          where: { id: blogCategoryId },
      });
      if (!blogCategory) {
          throw new NotFoundException(`Blog category with id ${blogCategoryId} not found...`);
      }
      return blogCategory;
  }

  async findByTitle(title: string): Promise<BlogCategory> {
      const blogCategory = await this.blogCategoryRepository.findOne({
          where: { title },
      });
      if (!blogCategory) {
          throw new NotFoundException(`Blog category with id ${title} not found...`);
      }
      return blogCategory;
  }

  async createBlogCategory(blogCategoryData: CreateBlogCategoryDto): Promise<BlogCategory> {
      const errors = await validate(blogCategoryData);
      if (errors.length > 0) {
          throw new BadRequestException('Invalid blog category data');
      }
      return await this.blogCategoryRepository.save(blogCategoryData);;
  }

  async updateBlogCategory(id: number, blogCategoryData: UpdateBlogCategoryDto): Promise<void> {
      const blogCategory = await this.blogCategoryRepository.findOneBy({ id });
      if (!blogCategory) {
          throw new NotFoundException(`Blog category with id ${id} not found`);
      }

      this.blogCategoryRepository.merge(blogCategory, blogCategoryData);
      const errors = await validate(blogCategory);
      if (errors.length > 0) {
          throw new BadRequestException('Invalid blog category data');
      }

      await this.blogCategoryRepository.save(blogCategory);
  }
}
