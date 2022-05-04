import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}