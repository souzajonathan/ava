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
import { IsDate } from "class-validator";
import { ComponentesPedido } from "./ComponentesPedido";
import { DisciplinaVersao } from "./DisciplinaVersao";
import { TiposSolicitacao } from "./TiposSolicitacao";

@Entity("pedidos")
export class Pedido {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => ComponentesPedido, (componentes) => componentes.pedido)
    componentes: ComponentesPedido[];

    @ManyToOne(() => DisciplinaVersao)
    @JoinColumn({ name: "disciplina_versao_id" })
    versaoDisciplina: DisciplinaVersao;

    @Column("uuid")
    disciplina_versao_id: string;

    @ManyToOne(() => TiposSolicitacao)
    @JoinColumn({ name: "tipo_solicitacao_id" })
    tipoSolicitacao: TiposSolicitacao;

    @Column("uuid")
    tipo_solicitacao_id: string;

    @Column("boolean")
    analisado: boolean;

    @Column("timestamp with time zone")
    @IsDate()
    data_entrega: Date;

    @Column("boolean")
    aprovacao_interna: boolean;

    @Column("boolean")
    aprovacao_externa: boolean;

    @Column("boolean")
    concluido: boolean;

    @Column()
    observacoes: string;

    @Column("uuid")
    solicitante_id: string;

    @Column("uuid")
    responsavel_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
