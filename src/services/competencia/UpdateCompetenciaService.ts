import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { Ppc } from "../../entities/Ppc";

type CompetenciaUpdateRequest = {
    id: string;
    ppc_id: string;
    competencia: string;
    competenciaNumero: string;
};

export class UpdateCompetenciaService {
    async execute ({id, ppc_id, competencia, competenciaNumero}: CompetenciaUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        if(ppc_id){
            if(!validate(ppc_id)){
                return new Error("ID de PPC inválido");
            }
        }
        
        const repo = getRepository(CompetenciasHabilidades);
        const competHabilidades = await repo.findOne(id);
        if (!competHabilidades) {
            return new Error("Competências e Habilidades não existente!");
        }
        
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if (!ppc) {
            return new Error("Ppc não existente!");
        }

        competHabilidades.ppc_id = ppc_id ? ppc_id : competHabilidades.ppc_id;
        competHabilidades.competencia = competencia ? competencia : competHabilidades.competencia;
        competHabilidades.competenciaNumero = competenciaNumero ? competenciaNumero : competHabilidades.competenciaNumero;

        await repo.save(competHabilidades);

        return {
            ...competHabilidades, ppc
        };
    }
}