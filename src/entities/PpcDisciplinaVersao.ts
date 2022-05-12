import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompetHabilidades } from "./CompetHabilidades";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { PerfilEgresso } from "./PerfilEgresso";
import { Ppc } from "./Ppc";

@Entity("ppcDisciplinaVersao")
export class PpcDisciplinaVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Ppc)
    @JoinColumn({name: "ppc_id"})
    ppc: Ppc;

    @Column("uuid")
    ppc_id: string;

    @ManyToOne(() => DisciplinaVersao)
    @JoinColumn({name: "disciplina_versao_id"})
    versoes: DisciplinaVersao;

    @Column("uuid")
    disciplina_versao_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    modulo: string;

    @Column()
    semestre: string;

    @ManyToMany(() => CompetHabilidades)
    @JoinTable({
        name: "competencia_ppc_versao",
        joinColumn: {name: "ppc_disciplina_versao_id"},
        inverseJoinColumn: {name: "competencia_id"}
    })
    competencias: CompetHabilidades[];

    @ManyToMany(() => PerfilEgresso)
    @JoinTable({
        name: "perfil_ppc_versao",
        joinColumn: {name: "ppc_disciplina_versao_id"},
        inverseJoinColumn: {name: "perfil_id"}
    })
    perfis: PerfilEgresso[];
    
}