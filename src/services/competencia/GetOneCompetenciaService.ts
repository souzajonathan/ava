import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";

export class GetOneCompetenciaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(CompetenciasHabilidades);

        const competencia = await repo
            .createQueryBuilder("competencia")
            .where({
                id: id
            })
            .leftJoinAndSelect("competencia.ppc", "ppc")
            .leftJoinAndSelect("ppc.ppcDisciplinaVersoes", "ppcDisciplinaVersoes")
            .leftJoinAndSelect("ppcDisciplinaVersoes.versoes", "versoes")
            .getOne();

        if (!competencia) {
            return new Error("Competência não existe!");
        }

        return competencia;
    }
}