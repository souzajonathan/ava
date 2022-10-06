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
import { Pedido } from "./Pedido";
import { TiposComponentes } from "./TiposComponentes";

@Entity("componentes_pedido")
export class ComponentesPedido {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    observacao: string;

    @Column()
    item_interno: boolean;

    @Column("uuid")
    pedido_id: string;

    @Column("uuid")
    tipo_componente_id: string;

    @Column("uuid")
    parent_item: string;

    @OneToMany(
        () => ComponentesPedidoVersao,
        (componente) => componente.componente
    )
    versoes: ComponentesPedidoVersao[];

    @ManyToOne(() => Pedido)
    @JoinColumn({ name: "pedido_id" })
    pedido: Pedido[];

    @ManyToOne(() => TiposComponentes)
    @JoinColumn({ name: "tipo_componente_id" })
    tipoComponente: TiposComponentes[];

    @ManyToOne(() => ComponentesPedido)
    @JoinColumn({ name: "parent_item" })
    componenteParent: ComponentesPedido;

    @OneToMany(
        () => ComponentesPedido,
        (componentes) => componentes.componenteParent
    )
    componenteChildren: ComponentesPedido[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
