import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { Obra } from "./Obra";

@Entity("bibliografias")
export class Bibliografia {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => DisciplinaVersao)
    @JoinColumn({name: "versao_disciplina_id"})
    versoes: DisciplinaVersao;

    @Column("uuid")
    versao_disciplina_id: string;

    @ManyToOne(() => Obra)
    @JoinColumn({name: "obra_id"})
    obras: Obra;

    @Column("uuid")
    obra_id: string;
    
    @Column()
    tipo: boolean;
    
}