import { getRepository } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

export class GetAllCompetenciasService {
    async execute() {
        const repo = getRepository(CompetHabilidades);

        const competHabilidades = await repo.find();

        return competHabilidades;
    }
}