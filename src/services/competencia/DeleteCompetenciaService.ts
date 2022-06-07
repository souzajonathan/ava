import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";

export class DeleteCompetenciaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(CompetenciasHabilidades);
        const competencia = await repo.findOne(id);
        
        if(!competencia){
            return new Error("Competências e Habilidades não existente!");
        }

        await repo.delete(id);
    }
}