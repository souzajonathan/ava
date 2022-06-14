import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompetenciasHabilidades } from "./CompetenciasHabilidades";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { PerfilEgresso } from "./PerfilEgresso";
import { Ppc } from "./Ppc";

@Entity("ppc_disciplina_versao")
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

    @Column("int")
    modulo: number;

    @Column("int")
    semestre: number;

    @ManyToMany(() => CompetenciasHabilidades)
    @JoinTable({
        name: "competencia_ppc_versao",
        joinColumn: {name: "ppc_disciplina_versao_id"},
        inverseJoinColumn: {name: "competencia_id"}
    })
    competencias: CompetenciasHabilidades[];

    @ManyToMany(() => PerfilEgresso)
    @JoinTable({
        name: "perfil_ppc_versao",
        joinColumn: {name: "ppc_disciplina_versao_id"},
        inverseJoinColumn: {name: "perfil_id"}
    })
    perfis: PerfilEgresso[];
    
}