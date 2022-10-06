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
import { Bibliografia } from "./Bibliografia";
import { Disciplina } from "./Disciplina";
import { Instituicao } from "./Instituicao";
import { Pedido } from "./Pedido";
import { PpcDisciplinaVersao } from "./PpcDisciplinaVersao";

@Entity("disciplina_versao")
export class DisciplinaVersao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Disciplina)
    @JoinColumn({ name: "disciplina_id" })
    disciplina: Disciplina;

    @OneToMany(
        () => PpcDisciplinaVersao,
        (ppcDisciplinaVersao) => ppcDisciplinaVersao.versao
    )
    ppcDisciplinaVersoes: PpcDisciplinaVersao[];

    @OneToMany(() => Bibliografia, (bibliografias) => bibliografias.versao)
    bibliografias: Bibliografia[];

    @OneToMany(() => Pedido, (pedidos) => pedidos.versaoDisciplina)
    pedidos: Pedido[];

    @Column("uuid")
    disciplina_id: string;

    @Column()
    disciplina_versao_nome: string;

    @Column()
    codigo: string;

    @Column("int")
    credito_quantidade: number;

    @Column()
    ementa: string;

    @Column()
    observacao: string;

    @Column()
    em_oferta: boolean;

    @Column()
    produzido: boolean;

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
