import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompetHabilidades } from "./CompetHabilidades";
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

    @OneToMany(() => CompetHabilidades, (competencia) => competencia.ppc)
    competencias: CompetHabilidades[];

    @OneToMany(() => PpcDisciplinaVersao, (ppcDisciplinaVersao) => ppcDisciplinaVersao.ppc)
    versoesPdv: PpcDisciplinaVersao[];
    
    @Column("uuid")
    curso_id: string;

    @Column("int")
    anoVoto: number;

    @Column()
    dataInicio: string;

    @Column()
    dataFim: string;

    @Column()
    horaCredito: number;

    @Column("int")
    quantSemestres: number;
    
    @CreateDateColumn()
    created_at: Date;

}