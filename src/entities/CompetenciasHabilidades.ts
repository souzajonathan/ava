import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    competencia: string;

    @Column("int")
    competenciaNumero: number;
    
}