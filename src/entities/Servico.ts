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
import { ComponentesPedidoVersao } from "./ComponentePedidoVersao";
import { ProfissionalServico } from "./ProfissionalServico";
import { TiposServicos } from "./TiposServicos";

@Entity("servicos")
export class Servico {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(
        () => ProfissionalServico,
        (profissionalServico) => profissionalServico.servico
    )
    profissionaisServico: ProfissionalServico[];

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
