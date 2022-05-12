import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area";
import { DisciplinaVersao } from "./DisciplinaVersao";

@Entity("disciplinas")
export class Disciplina {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column()
    sigla: string;
    
    @Column("uuid")
    area_id: string;
    
    @ManyToOne(() => Area)
    @JoinColumn({name: "area_id"})
    area: Area;

    @OneToMany(() => DisciplinaVersao, (versao) => versao.disciplina)
    versoes: DisciplinaVersao[];
    
    @CreateDateColumn()
    created_at: Date;

}