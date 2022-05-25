import { getRepository } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

export class GetOneCompetenciaService {
    async execute(id: string) {
        const repo = getRepository(CompetHabilidades);

        const competencia = await repo.findOne(id, {
            relations: ["ppc"]
        });

        if (!competencia) {
            return new Error("Competência não existe!");
        }

        return competencia;
    }

}