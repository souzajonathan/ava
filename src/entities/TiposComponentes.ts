import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CheckTipoServico } from "./CheckTipoServico";
import { ComponentesPedido } from "./ComponentesPedido";
import { ComponentesTrilhaComponentes } from "./ComponentesTrilhaComponente";
import { TrilhaServicos } from "./TrilhaServicos";

@Entity("tipos_componentes")
export class TiposComponentes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    carga_horaria: number;

    @OneToMany(
        () => ComponentesTrilhaComponentes,
        (componentes) => componentes.tipos
    )
    componentesTrilha: ComponentesTrilhaComponentes[];

    @OneToMany(
        () => ComponentesPedido,
        (componentes) => componentes.tipoComponente
    )
    componentesPedido: ComponentesPedido[];

    @OneToMany(() => TrilhaServicos, (trilhas) => trilhas.tipoComponente)
    trilhasServicos: TrilhaServicos[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => CheckTipoServico, (check) => check.tipoComponente)
    checksTipoServico: CheckTipoServico[];
}
