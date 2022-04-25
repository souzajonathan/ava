import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area";

@Entity("disciplinas")
export class Disciplina {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column("uuid")
    area_id: string;

    @ManyToOne(() => Area)
    @JoinColumn({name: "area_id"})
    area: Area;
    
    @CreateDateColumn()
    created_at: Date;

}