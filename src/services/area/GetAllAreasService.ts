import { FindConditions, getRepository, Raw } from "typeorm";
import { Area } from "../../entities/Area";

type filter = {
    nome?: string;
}

export class GetAllAreasService {
    async execute(query?:filter) {
        const repo = getRepository(Area);

        const where: FindConditions<Area> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        const areas = await repo.find({
            relations: ["disciplinas"],
            where
        });

        return areas;
    }
}