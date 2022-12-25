import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { Blog } from "src/blogs/entity/blog.entity";
import { Player } from "src/players/entity/player.entity";
import { Team } from "src/teams/entity/team.entity";
import { TournamentCategory } from "src/tournament-category/entity/tournament-category.entity";
import { User } from "src/users/entity/user.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import shortid from "shortid";

@Entity('tournaments')
export class Tournament {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @ManyToMany(() => Player, (player) => player.tournaments)
    @JoinTable()
    players: Player[];

    @ManyToMany(() => Team, (team) => team.tournaments)
    @JoinTable()
    teams: Team[];

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
