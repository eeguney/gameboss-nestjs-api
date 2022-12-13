import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { Blog } from "src/blogs/entity/blog.entity";
import { TournamentCategory } from "src/tournament-category/entity/tournament-category.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity('tournaments')
export class Tournament {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @MinLength(10)
    @MaxLength(240)
    @Column({ unique: true })
    title: string;

    @ApiProperty()
    @Column({ unique: true })
    slug: string;

    @ApiProperty()
    @Column({ default: '' })
    thumbnail: string;

    @ApiProperty()
    @MinLength(10)
    @Column()
    text: string;

    @ApiProperty()
    @Column({ nullable: true })
    video?: string;

    @ApiProperty({ type: Number })
    @ManyToOne(() => TournamentCategory, (category) => category.tournaments)
    category: TournamentCategory;

    @RelationId((post: Blog) => post.category)
    categoryId: number;

    @ApiProperty({ type: Number })
    @ManyToOne(() => User, (user) => user.blog)
    user: User;

    @RelationId((post: Blog) => post.user)
    userId: number;
}
