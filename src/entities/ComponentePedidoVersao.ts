import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Pedido } from "./Pedido";

@Entity("componentes_pedido")
export class ComponentesPedido {
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

    /*@OneToMany(() => ObraAutor, (obrasAutores) => obrasAutores.obras)
    obrasAutores: ObraAutor[];*/

    @ManyToOne(() => Pedido)
    @JoinColumn({ name: "pedido_id" })
    pedido: Pedido[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
