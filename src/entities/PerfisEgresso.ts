import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Instituicao } from "./Instituicao";
import { Ppc } from "./Ppc";

@Entity("perfis_egresso")
export class PerfisEgresso {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Ppc)
    @JoinColumn({ name: "ppc_id" })
    ppc: Ppc;

    @Column("uuid")
    ppc_id: string;

    @Column()
    perfil: string;

    @Column("int")
    perfilNumero: number;

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
