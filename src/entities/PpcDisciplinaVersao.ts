import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";
import { Ppc } from "./Ppc";

@Entity("ppcDisciplinaVersao")
export class PpcDisciplinaVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Ppc)
    @JoinColumn({name: "ppc_id"})
    curso: Ppc;
    @Column("uuid")
    ppc_id: string;

    @ManyToOne(() => Disciplina)
    @JoinColumn({name: "disciplina_id"})
    disciplina: Disciplina;
    @Column("uuid")
    disciplina_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    modulo: string;

    @Column()
    semestre: string;
    
}