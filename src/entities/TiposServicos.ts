import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Servico } from "./Servico";
import { ServicosTrilhaServicos } from "./ServicosTrilhaServicos";

@Entity("tipos_servicos")
export class TiposServicos {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column("numeric")
    valor: number;

    @Column()
    unidade_medida: string;

    @Column("boolean")
    aprovacao: boolean;

    @OneToMany(() => Servico, (servico) => servico.tipoServico)
    servicos: Servico[];

    @OneToMany(() => ServicosTrilhaServicos, (servico) => servico.tipoServico)
    servicosTrilhaServicos: ServicosTrilhaServicos[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
