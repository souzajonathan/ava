import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Funcao } from "./Funcao";
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

    @ManyToMany(() => Funcao)
    @JoinTable({
        name: "funcoes_tipos",
        joinColumn: { name: "tipo_id" },
        inverseJoinColumn: { name: "funcao_id" },
    })
    funcoes: Funcao[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
