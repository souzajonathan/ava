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
import { Agente } from "./Agente";
import { FuncoesRodada } from "./FuncoesRodada";
import { Profissional } from "./Profissional";
import { TiposServicos } from "./TiposServicos";

@Entity("funcoes")
export class Funcao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Agente, (agentes) => agentes.funcao)
    agentes: Agente[];

    @OneToMany(() => FuncoesRodada, (funcoes) => funcoes.funcao)
    funcoesRodadas: FuncoesRodada[];

    @ManyToMany(() => TiposServicos)
    @JoinTable({
        name: "funcoes_tipos",
        joinColumn: { name: "funcao_id" },
        inverseJoinColumn: { name: "tipo_id" },
    })
    tiposServicos: TiposServicos[];

    @ManyToMany(() => Profissional)
    @JoinTable({
        name: "profissionais_funcoes",
        joinColumn: { name: "funcao_id" },
        inverseJoinColumn: { name: "profissional_id" },
    })
    profissionais: Profissional[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
