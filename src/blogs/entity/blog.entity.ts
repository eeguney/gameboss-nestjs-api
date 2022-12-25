import { Entity, Column, RelationId, ManyToOne, PrimaryColumn, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { User } from 'src/users/entity/user.entity';
import { BlogCategory } from 'src/blog-category/entity/blog-category.entity';
import shortid from 'shortid';

@Entity('blogs')
export class Blog {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @MinLength(10)
    @MaxLength(240)
    @Column({ unique: true })
    title: string;

    @ApiProperty()
    @Column({ unique: true })
    slug: string;

    @ApiProperty()
    @Column({ default: '' })
    thumbnail: string;

    @ApiProperty()
    @MinLength(10)
    @Column({ type: 'longtext' })
    text: string;

    @ApiProperty({ type: Number })
    @ManyToOne(() => BlogCategory, (category) => category.blogs)
    category: BlogCategory;

    @RelationId((post: Blog) => post.category)
    categoryId: number;

    @ApiProperty({ type: Number })
    @ManyToOne(() => User, (user) => user.blog)
    user: User;

    @RelationId((post: Blog) => post.user)
    userId: number;

}
