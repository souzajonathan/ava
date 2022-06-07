import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompetenciasHabilidades } from "./CompetenciasHabilidades";
import { Curso } from "./Curso";
import { PerfilEgresso } from "./PerfilEgresso";
import { PpcDisciplinaVersao } from "./PpcDisciplinaVersao";

@Entity("ppcs")
export class Ppc {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Curso)
    @JoinColumn({name: "curso_id"})
    curso: Curso;

    @OneToMany(() => PerfilEgresso, (perfil) => perfil.ppc)
    perfis: PerfilEgresso[];

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

}