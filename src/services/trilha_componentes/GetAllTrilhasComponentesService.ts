import { FindConditions, getRepository, Raw } from "typeorm";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

type filter = {
    nome?: string;
};

export class GetAllTrilhasComponentesService {
    async execute(query?: filter) {
        const repo = getRepository(TrilhaComponentes);

        const where: FindConditions<TrilhaComponentes> = {};

        if (query?.nome) {
            where.nome_versao_trilha = Raw(
                (alias) => `${alias} ilike '%${query.nome}%'`
            );
        }

        const tipos = await repo.find({
            relations: ["trilha"],
            where,
        });

        return tipos;
    }
}
