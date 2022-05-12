import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ppc } from "./Ppc";

@Entity("cursos")
export class Curso {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    @Column("uuid", {
        name: "ppc_ativo"
    })
    ppcAtivo: string;

    @OneToMany(() => Ppc, (ppc) => ppc.curso)
    ppcs: Ppc[];

}