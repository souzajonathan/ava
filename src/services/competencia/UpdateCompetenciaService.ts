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
        const repo = getRepository(CompetenciasHabilidades);
        const repoPpc = getRepository(Ppc);

        const competHabilidades = await repo.findOne(id);
        const ppc = await repoPpc.findOne(ppc_id);

        if (!competHabilidades) {
            return new Error("Competências e Habilidades não existente!");
        }

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