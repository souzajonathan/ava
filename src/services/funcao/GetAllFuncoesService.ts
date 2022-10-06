import { FindConditions, getRepository, Raw } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";

type filter = {
    nome?: string;
};

export class GetAllAreasService {
    async execute(query?: filter, instituicao_id?: string) {
        const repo = getRepository(Area);

        const where: FindConditions<Area> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const areas = await repo.find({
            relations: ["disciplinas"],
            where,
        });

        return areas;
    }
}
