import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Pedido } from "./Pedido";

@Entity("tipos_solicitacao")
export class TiposSolicitacao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Pedido, (pedidos) => pedidos.tipoSolicitacao)
    pedidos: Pedido[];

    @Column()
    tipo: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
