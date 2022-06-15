import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ppc } from "./Ppc";

@Entity("perfis_egresso")
export class PerfisEgresso {
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
    perfil: string;

    @Column("int")
    perfilNumero: number;
    
}