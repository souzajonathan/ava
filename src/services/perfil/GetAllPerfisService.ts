import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfisEgresso } from "../../entities/PerfisEgresso";

export class GetAllPerfisService {
    async execute(instituicao_id?: string) {
        const repo = getRepository(PerfisEgresso);

        const where: FindConditions<PerfisEgresso> = {};

        const perfis = await repo.find({
            relations: ["ppc"],
        });

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        return perfis;
    }
}
