import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Disciplina } from "./Disciplina";
import { Instituicao } from "./Instituicao";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Disciplina, (disciplina) => disciplina.area)
    disciplinas: Disciplina[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column("uuid")
    instituicao_id: string;

    @ManyToOne(() => Instituicao)
    @JoinColumn({ name: "instituicao_id" })
    instituicao: Instituicao;
}
