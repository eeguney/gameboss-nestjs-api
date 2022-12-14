import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiPropertyOptional({ required: false })
    displayName?: string;

    @ApiPropertyOptional({ required: false })
    fullname?: string;

    @ApiPropertyOptional({ required: false })
    profilePhoto?: string;

}