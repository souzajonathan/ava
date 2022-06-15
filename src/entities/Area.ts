import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Disciplina } from "./Disciplina";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;
    
    @OneToMany(() => Disciplina, (disciplina) => disciplina.area)
    disciplinas: Disciplina[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}