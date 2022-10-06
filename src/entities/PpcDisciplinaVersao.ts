import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CompetenciasHabilidades } from "./CompetenciasHabilidades";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { Instituicao } from "./Instituicao";
import { PerfisEgresso } from "./PerfisEgresso";
import { Ppc } from "./Ppc";

@Entity("ppc_disciplina_versao")
export class PpcDisciplinaVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Ppc)
    @JoinColumn({ name: "ppc_id" })
    ppc: Ppc;

    @Column("uuid")
    ppc_id: string;

    @ManyToOne(() => DisciplinaVersao)
    @JoinColumn({ name: "disciplina_versao_id" })
    versao: DisciplinaVersao;

    @Column("uuid")
    disciplina_versao_id: string;

    @Column("int")
    modulo: number;

    @Column("int")
    semestre: number;

    @ManyToMany(() => CompetenciasHabilidades)
    @JoinTable({
        name: "competencia_ppc_versao",
        joinColumn: { name: "ppc_disciplina_versao_id" },
        inverseJoinColumn: { name: "competencia_id" },
    })
    competencias: CompetenciasHabilidades[];

    @ManyToMany(() => PerfisEgresso)
    @JoinTable({
        name: "perfil_ppc_versao",
        joinColumn: { name: "ppc_disciplina_versao_id" },
        inverseJoinColumn: { name: "perfil_id" },
    })
    perfis: PerfisEgresso[];

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
