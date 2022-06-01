import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bibliografia } from "./Bibliografia";
import { Disciplina } from "./Disciplina";
import { PpcDisciplinaVersao } from "./PpcDisciplinaVersao";

@Entity("disciplinaVersao")
export class DisciplinaVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Disciplina)
    @JoinColumn({name: "disciplina_id"})
    disciplina: Disciplina;

    @OneToMany(() => PpcDisciplinaVersao, (ppcDisciplinaVersao) => ppcDisciplinaVersao.versoes)
    ppcDisciplinaVersoes: PpcDisciplinaVersao[];

    @OneToMany(() => Bibliografia, (bibliografias) => bibliografias.versoes)
    bibliografias: Bibliografia[];
    
    @Column("uuid")
    disciplina_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    disciplina_versao_nome: string;
    
    @Column()
    codigo: string;

    @Column()
    credito_quantidade: number;

    @Column()
    ementa: string;

    @Column()
    observacao: string;

    @Column()
    em_oferta: boolean;

    @Column()
    produzido: boolean;
}