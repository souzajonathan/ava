import { getRepository } from "typeorm";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { Ppc } from "../../entities/Ppc";

type CompetenciaRequest = {
    ppc_id: string;
    competencia: string;
    competenciaNumero: string;
};

export class CreateCompetenciaService {
    async execute({ ppc_id, competencia, competenciaNumero }: CompetenciaRequest) {
        const repo = getRepository(CompetenciasHabilidades);
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);

        if(!ppc) {
            return new Error("Ppc não existe!");
        }

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