import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ppc } from "./Ppc";

@Entity("competencias_habilidades")
export class CompetenciasHabilidades {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Ppc)
    @JoinColumn({name: "ppc_id"})
    ppc: Ppc;
    
    @Column("uuid")
    ppc_id: string; 
    
    @Column()
    competencia: string;
    
    @Column("int")
    competenciaNumero: number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}