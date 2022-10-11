import { FindConditions, getRepository, Raw } from "typeorm";
import { TiposServicos } from "../../entities/TiposServicos";

type filter = {
    nome?: string;
};

export class GetAllTiposServicosService {
    async execute(query?: filter) {
        const repo = getRepository(TiposServicos);

        const where: FindConditions<TiposServicos> = {};

        if (query?.nome) {
            where.nome = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        const tipos = await repo.find({
            relations: ["servicos"],
            where,
        });

        return tipos;
    }
}
