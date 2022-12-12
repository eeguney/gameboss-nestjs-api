import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { MinLength, MaxLength } from "class-validator";

export class UpdateUserDto {

    @ApiProperty()
    @MinLength(2)
    @MaxLength(30)
    fullname: string;

}