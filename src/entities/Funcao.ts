import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Agente } from "./Agente";
import { FuncoesRodada } from "./FuncoesRodada";

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
