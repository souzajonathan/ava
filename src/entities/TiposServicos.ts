import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Servico } from "./Servico";

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

    /* @ManyToMany(() => Servico)
    @JoinTable({
        name: "servicos_tipos_servicos",
        joinColumn: { name: "tipo_servico_id" },
        inverseJoinColumn: { name: "servico_id" },
    })
    servicos: Servico[]; */

    @OneToMany(() => Servico, (servico) => servico.tipoServico)
    servicos: Servico[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
