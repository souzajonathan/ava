import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Profissional } from "./Profissional";
import { Servico } from "./Servico";

@Entity("profissionais_servicos")
export class ProfissionalServico {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    servico_id: string;

    @ManyToOne(() => Servico)
    @JoinColumn({ name: "servico_id" })
    servico: Servico;

    @Column("uuid")
    profissional_id: string;

    @ManyToOne(() => Profissional)
    @JoinColumn({ name: "profissional_id" })
    profissional: Profissional;

    @Column("timestamp with time zone")
    data_prazo: Date;

    @Column("timestamp with time zone")
    data_entrega: Date;

    @Column("boolean")
    convite: boolean;

    @Column("boolean")
    aceite: boolean;

    @Column("int")
    contrato: number;

    @Column("boolean")
    entrega: boolean;

    @Column("boolean")
    check: boolean;

    @Column("int")
    ajuste: number;

    @Column("boolean")
    aprovacao_servico: boolean;

    @Column("boolean")
    fechado: boolean;

    @Column("boolean")
    pagamento: boolean;

    @Column("numeric")
    valor_orcado: number;

    @Column("numeric")
    valor_pago: number;

    @Column()
    observacao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
