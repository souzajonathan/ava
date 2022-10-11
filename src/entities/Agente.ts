import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Curso } from "./Curso";
import { Funcao } from "./Funcao";
import { Usuario } from "./Usuario";

@Entity("agentes")
export class Agente {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    usuario_id: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column("uuid")
    curso_id: string;

    @ManyToOne(() => Curso)
    @JoinColumn({ name: "curso_id" })
    curso: Curso;

    @Column("uuid")
    funcao_id: string;

    @ManyToOne(() => Funcao)
    @JoinColumn({ name: "funcao_id" })
    funcao: Funcao;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
