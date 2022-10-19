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
        name: "funcao_tipo",
        joinColumn: { name: "funcao_id" },
        inverseJoinColumn: { name: "tipo_id" },
    })
    tiposServicos: TiposServicos[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
