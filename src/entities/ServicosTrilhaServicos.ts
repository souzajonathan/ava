import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { TiposServicos } from "./TiposServicos";
import { TrilhaServicos } from "./TrilhaServicos";

@Entity("servicos_trilha_servicos")
export class ServicosTrilhaServicos {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    tipo_servico_id: string;

    @Column("uuid")
    trilha_servicos_id: string;

    @Column("int")
    posicao: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => TiposServicos)
    @JoinColumn({ name: "tipo_servico_id" })
    tipoServico: TiposServicos;

    @ManyToOne(() => TrilhaServicos)
    @JoinColumn({ name: "trilha_servicos_id" })
    trilhaServicos: TrilhaServicos;
}
