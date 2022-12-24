import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { MinLength, IsEmail, MaxLength, Validate } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    picture?: string;


    @ApiPropertyOptional()
    @Exclude({ toPlainOnly: true })
    password?: string;
}
