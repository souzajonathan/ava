import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompetenciasHabilidades } from "./CompetenciasHabilidades";
import { Curso } from "./Curso";
import { PerfisEgresso } from "./PerfisEgresso";
import { PpcDisciplinaVersao } from "./PpcDisciplinaVersao";

@Entity("ppcs")
export class Ppc {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Curso)
    @JoinColumn({name: "curso_id"})
    curso: Curso;

    @OneToMany(() => PerfisEgresso, (perfil) => perfil.ppc)
    perfis: PerfisEgresso[];

    @OneToMany(() => CompetenciasHabilidades, (competencia) => competencia.ppc)
    competencias: CompetenciasHabilidades[];

    @OneToMany(() => PpcDisciplinaVersao, (ppcDisciplinaVersao) => ppcDisciplinaVersao.ppc)
    ppcDisciplinaVersoes: PpcDisciplinaVersao[];
    
    @Column("uuid")
    curso_id: string;

    @Column("int")
    anoVoto: number;

    @Column()
    dataInicio: string;

    @Column()
    dataFim: string;

    @Column("int")
    horaCredito: number;

    @Column("int")
    quantSemestres: number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}