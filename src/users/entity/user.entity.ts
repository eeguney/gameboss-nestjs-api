import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
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
    username: string;

    @ApiProperty()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @MinLength(2)
    @MaxLength(30)
    @Column()
    fullname: string;

    @ApiProperty()
    @MinLength(8)
    @MaxLength(30)
    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Blog, (blog) => blog.user)
    blog: Blog[];
}
