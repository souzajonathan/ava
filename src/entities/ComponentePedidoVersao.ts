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
import { ComponentesPedido } from "./ComponentesPedido";
import { TiposSolicitacao } from "./TiposSolicitacao";

@Entity("componentes_pedido_versao")
export class ComponentesPedidoVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column("uuid")
    componente_pedido_id: string;

    @Column("uuid")
    tipo_solicitacao_id: string;

    @Column()
    concluido: boolean;

    @Column()
    cancelado: boolean;

    @Column("uuid", {
        nullable: true,
    })
    parent_item: string;

    @ManyToOne(() => ComponentesPedidoVersao)
    @JoinColumn({ name: "parent_item" })
    versaoParent: ComponentesPedidoVersao[];

    @OneToMany(() => ComponentesPedidoVersao, (versao) => versao.versaoParent)
    versaoChildren: ComponentesPedidoVersao;

    /*@OneToMany(() => ObraAutor, (obrasAutores) => obrasAutores.obras)
    obrasAutores: ObraAutor[];*/

    @ManyToOne(() => ComponentesPedido)
    @JoinColumn({ name: "componente_pedido_id" })
    componente: ComponentesPedido[];

    @ManyToOne(() => TiposSolicitacao)
    @JoinColumn({ name: "tipo_solicitacao_id" })
    tipoSolicitacao: TiposSolicitacao[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
