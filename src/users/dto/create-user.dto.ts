import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { MinLength, IsEmail, MaxLength, Validate } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    displayName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    @MaxLength(30)
    fullname?: string;

    @ApiPropertyOptional()
    @MinLength(8)
    @MaxLength(30)
    @Exclude({ toPlainOnly: true })
    password?: string;
}
