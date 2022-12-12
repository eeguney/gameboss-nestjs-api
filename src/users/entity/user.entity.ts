import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    @Column()
    username: string;

    @ApiProperty()
    @IsEmail()
    @Column()
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

}
