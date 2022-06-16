import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { Ppc } from "../../entities/Ppc";

type CompetenciaRequest = {
    ppc_id: string;
    competencia: string;
    competenciaNumero: number;
}

export class CreateCompetenciaService {
    async execute({ ppc_id, competencia, competenciaNumero }: CompetenciaRequest) {
        if(!validate(ppc_id)){
            return new Error("ID de PPC inválido");
        }

        if(!competencia){
            return new Error("Competência é obrigatória");
        }

        if(!Number.isInteger(competenciaNumero)){
            return new Error("Insira um número válido em 'número de competência'");
        }
        
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if(!ppc) {
            return new Error("Ppc não existe!");
        }
        
        const repo = getRepository(CompetenciasHabilidades);
        const competHabilidades = repo.create({
            ppc_id,
            competencia,
            competenciaNumero
        });

        await repo.save(competHabilidades);

        return {
            ...competHabilidades, ppc
        };
    }
}