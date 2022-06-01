import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObraAutor } from "./ObraAutor";

@Entity("autores")
export class Autor {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    first_name: string;

    @Column()
    middle_name: string;

    @Column()
    last_name: string;

    @Column()
    quote: string;

    @Column()
    nationality: string;
    
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => ObraAutor, (obrasAutores) => obrasAutores.autores)
    obrasAutores: ObraAutor[];

}