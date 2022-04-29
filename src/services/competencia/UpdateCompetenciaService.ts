import { getRepository } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

type CompetenciaUpdateRequest = {
    id: string;
    ppc_id: string;
    competencia: string;
    competenciaNumero: string;
};

export class UpdateCompetenciaService {
    async execute ({id, ppc_id, competencia, competenciaNumero}: CompetenciaUpdateRequest) {
        const repo = getRepository(CompetHabilidades);

        const competHabilidades = await repo.findOne(id);

        if (!competHabilidades) {
            return new Error("Competências e Habilidades não existente!");
        }

        competHabilidades.ppc_id = ppc_id ? ppc_id : competHabilidades.ppc_id;
        competHabilidades.competencia = competencia ? competencia : competHabilidades.competencia;
        competHabilidades.competenciaNumero = competenciaNumero ? competenciaNumero : competHabilidades.competenciaNumero;

        await repo.save(competHabilidades);

        return competHabilidades;
    }
}