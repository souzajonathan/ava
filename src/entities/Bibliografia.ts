import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { Obra } from "./Obra";

@Entity("bibliografias")
export class Bibliografia {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => DisciplinaVersao)
    @JoinColumn({name: "disciplina_versao_id"})
    versoes: DisciplinaVersao;

    @Column("uuid")
    disciplina_versao_id: string;

    @ManyToOne(() => Obra)
    @JoinColumn({name: "obra_id"})
    obras: Obra;

    @Column("uuid")
    obra_id: string;
    
    @Column()
    tipo: boolean;

    @CreateDateColumn()
    created_at: Date;
    
}