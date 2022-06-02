import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

export class GetOneCompetenciaService {
    async execute(id: string) {
        
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(CompetHabilidades);

        /* const competencia = await repo.findOne(id, {
            relations: ["ppc"]
        }); */

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