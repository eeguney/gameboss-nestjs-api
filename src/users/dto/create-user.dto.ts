import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { MinLength, IsEmail, MaxLength, Validate } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(2)
    @MaxLength(30)
    fullname: string;

    @ApiProperty()
    @MinLength(8)
    @MaxLength(30)
    @Exclude({ toPlainOnly: true })
    password: string;
}
