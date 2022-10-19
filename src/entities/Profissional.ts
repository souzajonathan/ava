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
import { Funcao } from "./Funcao";
import { ProfissionalServico } from "./ProfissionalServico";

@Entity("profissionais")
export class Profissional {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(
        () => ProfissionalServico,
        (profissionalServico) => profissionalServico.profissional
    )
    profissionalServicos: ProfissionalServico[];

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Funcao)
    @JoinTable({
        name: "profissionais_funcoes",
        joinColumn: { name: "profissional_id" },
        inverseJoinColumn: { name: "funcao_id" },
    })
    funcoes: Funcao[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
