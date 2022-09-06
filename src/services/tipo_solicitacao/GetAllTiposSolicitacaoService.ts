import { FindConditions, getRepository, Raw } from "typeorm";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type filter = {
    tipo?: string;
};

export class GetAllTiposSolicitacaoService {
    async execute(query?: filter) {
        const repo = getRepository(TiposSolicitacao);

        const where: FindConditions<TiposSolicitacao> = {};

        if (query?.tipo) {
            where.tipo = Raw((alias) => `${alias} ilike '%${query.tipo}%'`);
        }

        const tipos = await repo.find({
            relations: ["pedidos"],
            where,
        });

        return tipos;
    }
}
