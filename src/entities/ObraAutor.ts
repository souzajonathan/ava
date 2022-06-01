import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from "./Autor";
import { Obra } from "./Obra";

@Entity("obraAutor")
export class ObraAutor {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Autor)
    @JoinColumn({name: "autor_id"})
    autores: Autor;

    @Column("uuid")
    autor_id: string;

    @ManyToOne(() => Obra)
    @JoinColumn({name: "obra_id"})
    obras: Obra;

    @Column("uuid")
    obra_id: string;
    
    @Column()
    funcao: string;
    
}