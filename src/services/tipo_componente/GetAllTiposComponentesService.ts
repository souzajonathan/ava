import { FindConditions, getRepository, Raw } from "typeorm";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type filter = {
    name?: string;
};

export class GetAllTiposComponentesService {
    async execute(query?: filter) {
        const repo = getRepository(TiposComponentes);

        const where: FindConditions<TiposComponentes> = {};

        if (query?.name) {
            where.nome = Raw((alias) => `${alias} ilike '%${query.name}%'`);
        }

        const tipos = await repo.find({
            relations: ["tipos"],
            where,
        });

        return tipos;
    }
}
