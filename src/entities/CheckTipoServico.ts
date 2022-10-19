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
import { ListaChecks } from "./ListaChecks";
import { TiposComponentes } from "./TiposComponentes";
import { TiposServicos } from "./TiposServicos";

@Entity("checks_tipo_servico")
export class CheckTipoServico {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    tipo_componente_id: string;

    @Column("uuid")
    tipo_servico_id: string;

    @Column()
    check_servico: string;

    @Column()
    descricao: string;

    @Column("boolean")
    ativo: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => TiposServicos)
    @JoinColumn({ name: "tipo_servico_id" })
    tipoServico: TiposServicos;

    @ManyToOne(() => TiposComponentes)
    @JoinColumn({ name: "tipo_componente_id" })
    tipoComponente: TiposComponentes;

    @OneToMany(() => ListaChecks, (lista) => lista.checkTipoServico)
    listasCheck: ListaChecks[];
}
