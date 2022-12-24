import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { Exclude } from 'class-transformer';
import { Blog } from 'src/blogs/entity/blog.entity';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    googleId?: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(40)
    @Column()
    name: string;

    @ApiProperty()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @ApiPropertyOptional()
    @Column({ default: '', nullable: true })
    picture?: string;

    @ApiPropertyOptional()
    @Exclude()
    @Column({ nullable: true })
    password?: string;

    @OneToMany(() => Blog, (blog) => blog.user)
    blog: Blog[];
}
