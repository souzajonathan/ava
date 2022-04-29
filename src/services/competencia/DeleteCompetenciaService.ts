import { getRepository } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

export class DeleteCompetenciaService {
    async execute(id: string) {
        const repo = getRepository(CompetHabilidades);
        
        if(!(await repo.findOne(id))){
            return new Error("Competências e Habilidades não existente!");
        }

        await repo.delete(id);
    }
}