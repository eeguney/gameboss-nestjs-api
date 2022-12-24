import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength } from "class-validator";
import { Player } from "src/players/entity/player.entity";
import { Tournament } from "src/tournaments/entity/tournament.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('teams')
export class Team {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(40)
    @Column({ unique: true })
    name: string;

    @ApiProperty()
    @Column({ default: '' })
    thumbnail: string;

    @ApiProperty()
    @MinLength(10)
    @Column({ type: 'longtext' })
    text: string;

    @ApiProperty({ type: Player })
    @ManyToMany(() => Player, (player) => player.team)
    @JoinTable()
    players: Player[];

    @ManyToMany(() => Tournament, (tournament) => tournament.teams)
    @JoinTable()
    tournaments: Tournament[];
}
