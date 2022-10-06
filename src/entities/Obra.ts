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
import { ObraAutor } from "./ObraAutor";

@Entity("obras")
export class Obra {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    item_tipo: string;

    @Column()
    obra_nome: string;

    @Column()
    serie_nome: string;

    @Column()
    colecao_nome: string;

    @Column()
    cidade: string;

    @Column()
    editora: string;

    @Column("int")
    ano: number;

    @Column()
    mes: string;

    @Column("int")
    dia: number;

    @Column()
    volume: string;

    @Column()
    edicao: string;

    @Column()
    resumo: string;

    @Column()
    periodico_nome: string;

    @Column()
    periodico_abreviacao: string;

    @Column()
    numero: string;

    @Column()
    paginas: string;

    @Column()
    idioma: string;

    @Column()
    doi: string;

    @Column()
    isbn: string;

    @Column()
    issn: string;

    @Column()
    url: string;

    @Column()
    acesso_em: string;

    @Column("uuid")
    contido_em: string;

    @OneToMany(() => ObraAutor, (obrasAutores) => obrasAutores.obra)
    obrasAutores: ObraAutor[];

    @OneToMany(() => Bibliografia, (bibliografias) => bibliografias.obra)
    bibliografias: Bibliografia[];

    @ManyToOne(() => Obra)
    @JoinColumn({ name: "contido_em" })
    obraParent: Obra;

    @OneToMany(() => Obra, (obra) => obra.obraParent)
    obraChildren: Obra[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
