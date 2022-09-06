import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ComponentesTrilhaComponentes } from "./ComponentesTrilhaComponente";

@Entity("trilha_componentes")
export class TrilhaComponentes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome_versao_trilha: string;

    @Column()
    quantidade_creditos: number;

    @Column()
    observacoes: string;

    @OneToMany(
        () => ComponentesTrilhaComponentes,
        (componentes) => componentes.trilha
    )
    trilha: ComponentesTrilhaComponentes[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
