import { getRepository } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

type CompetenciaRequest = {
    ppc_id: string;
    competencia: string;
    competenciaNumero: string;
};

export class CreateCompetenciaService {
    async execute({ ppc_id, competencia, competenciaNumero }: CompetenciaRequest): Promise<CompetHabilidades | Error> {
        const repo = getRepository(CompetHabilidades);

        const competHabilidades = repo.create({
            ppc_id,
            competencia,
            competenciaNumero
        });

        await repo.save(competHabilidades);

        return competHabilidades;
    }

}