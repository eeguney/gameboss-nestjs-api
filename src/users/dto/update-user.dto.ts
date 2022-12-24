import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiPropertyOptional({ required: false })
    name?: string;

    @ApiPropertyOptional({ required: false })
    picture?: string;

}