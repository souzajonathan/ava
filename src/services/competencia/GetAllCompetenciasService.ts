import { getRepository } from "typeorm";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";

export class GetAllCompetenciasService {
    async execute() {
        const repo = getRepository(CompetenciasHabilidades);

        const competHabilidades = await repo.find({
            relations: ["ppc"]
        });

        return competHabilidades;
    }
}