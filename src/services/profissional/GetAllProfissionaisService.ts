import { FindConditions, getRepository, Raw } from "typeorm";
import { Profissional } from "../../entities/Profissional";

type filter = {
    nome?: string;
};

export class GetAllProfissionaisService {
    async execute(query?: filter) {
        const repo = getRepository(Profissional);

        const where: FindConditions<Profissional> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        const profissionais = await repo.find({
            relations: ["profissionalServicos"],
            where,
        });

        return profissionais;
    }
}
