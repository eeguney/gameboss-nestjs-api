import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Blog } from 'src/blogs/entity/blog.entity';

@Entity('blog-categories')
export class BlogCategory {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(40)
    @Column({ unique: true })
    title: string;

    @ApiProperty()
    @Column({ unique: true })
    slug: string;

    @ApiProperty()
    @Column({ nullable: true })
    info: string;

    @OneToMany(() => Blog, (blog) => blog.category)
    blogs: Blog[];
}
