import { Entity, ManyToMany, JoinTable } from "typeorm";
import { PerfilEgresso } from "./PerfilEgresso";
import { PpcDisciplinaVersao } from "./PpcDisciplinaVersao";

@Entity()
export class Morango {

    @ManyToMany(() => PpcDisciplinaVersao)
    @JoinTable()
    ppc_disciplina_versao_id: PpcDisciplinaVersao[];

    @ManyToMany(() => PerfilEgresso)
    @JoinTable()
    perfil_id: PerfilEgresso[];

}