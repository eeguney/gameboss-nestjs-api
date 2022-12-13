import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength } from "class-validator";
import { Tournament } from "src/tournaments/entity/tournament.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity('tournament-categories')
export class TournamentCategory {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(40)
    @Column({ unique: true })
    title: string;

    @ApiProperty()
    @Column({ unique: true })
    slug: string;

    @ApiProperty()
    @Column({ nullable: true })
    info: string;

    @OneToMany(() => Tournament, (tournament) => tournament.category)
    tournaments: Tournament[];
}
