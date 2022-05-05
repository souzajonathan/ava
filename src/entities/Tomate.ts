import { Entity, ManyToMany, JoinTable } from "typeorm";
import { CompetHabilidades } from "./CompetHabilidades";
import { PpcDisciplinaVersao } from "./PpcDisciplinaVersao";

@Entity()
export class Tomate {

    @ManyToMany(() => PpcDisciplinaVersao)
    @JoinTable()
    ppc_disciplina_versao_id: PpcDisciplinaVersao[];

    @ManyToMany(() => CompetHabilidades)
    @JoinTable()
    competencia_id: CompetHabilidades[];
    
}