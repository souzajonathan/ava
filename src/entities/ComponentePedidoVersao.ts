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

@Entity("componentes_pedido_versao")
export class ComponentesPedidoVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column("uuid")
    pedido_id: string;

    @Column()
    concluido: boolean;

    @Column()
    cancelado: boolean;

    @Column("uuid")
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
