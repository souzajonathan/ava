import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;
    
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Disciplina, (disciplina) => disciplina.area)
    disciplinas: Disciplina[];

}