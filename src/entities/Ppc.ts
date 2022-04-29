import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./Curso";

@Entity("ppcs")
export class Ppc {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Curso)
    @JoinColumn({name: "curso_id"})
    curso: Curso;
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