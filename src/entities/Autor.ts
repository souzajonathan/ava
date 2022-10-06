import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
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

    @OneToMany(() => ObraAutor, (obrasAutor) => obrasAutor.autor)
    obrasAutor: ObraAutor[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
