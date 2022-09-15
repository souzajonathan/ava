import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { TiposComponentes } from "./TiposComponentes";
import { TrilhaComponentes } from "./TrilhaComponentes";

@Entity("componentes_trilha_componentes")
export class ComponentesTrilhaComponentes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => TiposComponentes)
    @JoinColumn({ name: "tipos_componentes_id" })
    tipos: TiposComponentes;

    @Column("uuid")
    tipo_componente_id: string;

    @ManyToOne(() => TrilhaComponentes)
    @JoinColumn({ name: "trilha_componentes_id" })
    trilha: TrilhaComponentes;

    @Column("uuid")
    trilha_componentes_id: string;

    @Column()
    observacao: string;

    @Column()
    item_interno: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
