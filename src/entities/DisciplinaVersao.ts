import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";

@Entity("disciplinaVersao")
export class DisciplinaVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Disciplina)
    @JoinColumn({name: "disciplina_id"})
    curso: Disciplina;
    @Column("uuid")
    disciplina_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    disciplina_versao_nome: string;

    @Column()
    sigla: string;
    
    @Column()
    codigo: string;

    @Column()
    credito_quantidade: number;

    @Column()
    ementa: string;

    @Column()
    bibliografia_basica: string;

    @Column()
    comp_bibliografia: string;

    @Column()
    observacao: string;

    @Column()
    em_oferta: number;

    @Column()
    produzido: number;
}