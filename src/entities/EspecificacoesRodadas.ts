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
import { Entidade } from "./Entidade";
import { FuncoesRodada } from "./FuncoesRodada";
import { Instituicao } from "./Instituicao";

@Entity("especificacoes_rodadas")
export class EspecificacoesRodadas {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome_rodada: string;

    @Column("numeric")
    porcentagem_aprovacao: number;

    @Column("int")
    numero_rodada: number;

    @Column("uuid")
    entidade_id: string;

    @ManyToOne(() => Entidade)
    @JoinColumn({ name: "entidade_id" })
    entidade: Entidade;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => FuncoesRodada, (funcoes) => funcoes.funcao)
    funcoesRodadas: FuncoesRodada[];

    @Column("uuid")
    instituicao_id: string;

    @ManyToOne(() => Instituicao)
    @JoinColumn({ name: "instituicao_id" })
    instituicao: Instituicao;
}
