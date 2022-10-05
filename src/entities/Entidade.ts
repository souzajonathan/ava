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
import { EspecificacoesRodadas } from "./EspecificacoesRodadas";
import { Instituicao } from "./Instituicao";

@Entity("entidades")
export class Entidade {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    quantidade_rodadas: string;

    @OneToMany(
        () => EspecificacoesRodadas,
        (especificacao) => especificacao.entidade
    )
    especificacoes: EspecificacoesRodadas[];

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
