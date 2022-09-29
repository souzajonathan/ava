import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ComponentesPedidoVersao } from "./ComponentePedidoVersao";
import { TiposServicos } from "./TiposServicos";

@Entity("servicos")
export class Servico {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /* @OneToMany(() => ComponentesPedido, (componentes) => componentes.pedido)
    componentes: ComponentesPedido[]; */

    @ManyToOne(() => ComponentesPedidoVersao)
    @JoinColumn({ name: "componente_pedido_versao_id" })
    componentePedidoVersao: ComponentesPedidoVersao;

    @Column("uuid")
    componente_pedido_versao_id: string;

    @ManyToOne(() => TiposServicos)
    @JoinColumn({ name: "tipo_servico_id" })
    tipoServico: TiposServicos;

    @Column("uuid")
    tipo_servico_id: string;

    @Column()
    observacao: string;

    @Column("int")
    posicao: number;

    @Column("boolean")
    em_andamento: boolean;

    @Column("boolean")
    aprovacao: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
