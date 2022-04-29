import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ppc } from "./Ppc";

@Entity("competHabilidades")
export class CompetHabilidades {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Ppc)
    @JoinColumn({name: "ppc_id"})
    curso: Ppc;
    @Column("uuid")
    ppc_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    competencia: string;

    @Column()
    competenciaNumero: string;
    
}