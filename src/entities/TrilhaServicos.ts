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
import { ServicosTrilhaServicos } from "./ServicosTrilhaServicos";
import { TiposComponentes } from "./TiposComponentes";

@Entity("trilha_servicos")
export class TrilhaServicos {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(
        () => ServicosTrilhaServicos,
        (servico) => servico.trilhaServicos
    )
    servicosTrilhaServicos: ServicosTrilhaServicos[];

    @Column()
    nome_trilha: string;

    @Column("uuid")
    componente_tipo_id: string;

    @ManyToOne(() => TiposComponentes)
    @JoinColumn({ name: "componente_tipo_id" })
    tipoComponente: TiposComponentes;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
