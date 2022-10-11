import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
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
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
