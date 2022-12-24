import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';
import { Team } from 'src/teams/entity/team.entity';
import { Tournament } from 'src/tournaments/entity/tournament.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    RelationId,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity('players')
export class Player {
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

    @ApiProperty({ type: Team })
    @ManyToOne(() => Team, (team) => team.players)
    team: Team;

    @ManyToMany(() => Tournament, (tournament) => tournament.players)
    @JoinTable()
    tournaments: Tournament[];

    

}
