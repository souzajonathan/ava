import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { Obra } from "./Obra";

@Entity("bibliografias")
export class Bibliografia {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => DisciplinaVersao)
    @JoinColumn({ name: "disciplina_versao_id" })
    versao: DisciplinaVersao;

    @Column("uuid")
    disciplina_versao_id: string;

    @ManyToOne(() => Obra)
    @JoinColumn({ name: "obra_id" })
    obra: Obra;

    @Column("uuid")
    obra_id: string;

    @Column()
    tipo: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
