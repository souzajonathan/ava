import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CheckTipoServico } from "./CheckTipoServico";
import { ComponentesPedidoVersao } from "./ComponentePedidoVersao";
import { ProfissionalServico } from "./ProfissionalServico";

@Entity("lista_checks")
export class ListaChecks {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    check_id: string;

    @Column("uuid")
    profissional_servico_id: string;

    @Column("uuid")
    versao_componente_pedido_id: string;

    @Column("boolean")
    check: boolean;

    @Column()
    observacao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => CheckTipoServico)
    @JoinColumn({ name: "check_id" })
    checkTipoServico: CheckTipoServico;

    @ManyToOne(() => ProfissionalServico)
    @JoinColumn({ name: "profissional_servico_id" })
    profissionalServico: ProfissionalServico;

    @ManyToOne(() => ComponentesPedidoVersao)
    @JoinColumn({ name: "versao_componente_pedido_id" })
    versaoComponentePedido: ComponentesPedidoVersao;
}
