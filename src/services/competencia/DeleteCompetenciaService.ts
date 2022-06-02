import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

export class DeleteCompetenciaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(CompetHabilidades);
        const competencia = await repo.findOne(id);
        
        if(!competencia){
            return new Error("Competências e Habilidades não existente!");
        }

        await repo.delete(id);
    }
}