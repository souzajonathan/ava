import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { EspecificacoesRodadas } from "./EspecificacoesRodadas";
import { Funcao } from "./Funcao";
import { Instituicao } from "./Instituicao";

@Entity("funcoes_rodada")
export class FuncoesRodada {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("numeric")
    peso_voto: number;

    @Column()
    considerar_relevantes: string;

    @Column("uuid")
    especificacao_id: string;

    @ManyToOne(() => EspecificacoesRodadas)
    @JoinColumn({ name: "especificacao_id" })
    especificacao: EspecificacoesRodadas;

    @Column("uuid")
    funcao_id: string;

    @ManyToOne(() => Funcao)
    @JoinColumn({ name: "funcao_id" })
    funcao: Funcao;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column("uuid")
    instituicao_id: string;

    @ManyToOne(() => Instituicao)
    @JoinColumn({ name: "instituicao_id" })
    instituicao: Instituicao;
}
