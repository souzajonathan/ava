import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ComponentesTrilhaComponentes } from "./ComponentesTrilhaComponente";

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
        (componentes) => componentes.tipos_componentes_id
    )
    tipos: ComponentesTrilhaComponentes[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
