import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    capitulo_nome: string;

    @Column()
    serie_nome: string;

    @Column()
    colecao_nome: string;

    @Column()
    organizador_editor_nome: string;

    @Column()
    funcao: string;

    @Column()
    cidade: string;

    @Column()
    editora: string;

    @Column()
    ano: string;

    @Column()
    mes: string;
    
    @Column()
    dia: string;

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

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => ObraAutor, (obrasAutores) => obrasAutores.obras)
    obrasAutores: ObraAutor[];

    @OneToMany(() => Bibliografia, (bibliografias) => bibliografias.obras)
    bibliografias: Bibliografia[];

    @ManyToOne(() => Obra)
    @JoinColumn({name: "contido_em"})
    obraParent: Obra[];

    @OneToMany(() => Obra, (obras) => obras.obraParent)
    obrasChildren: Obra;

}