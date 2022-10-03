import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Instituicao } from "./Instituicao";
import { Ppc } from "./Ppc";

@Entity("cursos")
export class Curso {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("uuid")
    ppc_ativo: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Ppc, (ppc) => ppc.curso)
    ppcs: Ppc[];

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
