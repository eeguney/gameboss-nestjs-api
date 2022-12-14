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
    @MinLength(3)
    @MaxLength(20)
    @Column({ unique: true })
    displayName: string;

    @ApiProperty()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @ApiPropertyOptional()
    @Column({ default: '', nullable: true })
    profilePhoto?: string;

    @ApiPropertyOptional()
    @MaxLength(30)
    @Column({ nullable: true })
    fullname?: string;

    @ApiPropertyOptional()
    @MinLength(8)
    @MaxLength(30)
    @Exclude()
    @Column({ nullable: true })
    password?: string;

    @OneToMany(() => Blog, (blog) => blog.user)
    blog: Blog[];
}
