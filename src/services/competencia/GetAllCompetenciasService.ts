import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";

export class GetAllCompetenciasService {
    async execute(instituicao_id?: string) {
        const repo = getRepository(CompetenciasHabilidades);

        const where: FindConditions<CompetenciasHabilidades> = {};

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const competHabilidades = await repo.find({
            relations: ["ppc"],
        });

        return competHabilidades;
    }
}
