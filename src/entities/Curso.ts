import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ppc } from "./Ppc";

@Entity("cursos")
export class Curso {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;
    
    @Column("uuid")
    ppc_ativo: string;
    
    @OneToMany(() => Ppc, (ppc) => ppc.curso)
    ppcs: Ppc[];
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}