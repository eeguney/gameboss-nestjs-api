import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { MinLength, MaxLength } from "class-validator";
import { BlogCategory } from "src/blog-category/entity/blog-category.entity";
import { User } from "src/users/entity/user.entity";

export class CreateBlogDto {
    @ApiProperty()
    @MinLength(10)
    @MaxLength(240)
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    @MinLength(10)
    text: string;

    @ApiProperty()
    category: BlogCategory;

    @ApiProperty()
    user: User;
}
