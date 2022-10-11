import { FindConditions, getRepository, Raw } from "typeorm";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

type filter = {
    nome?: string;
};

export class GetAllTrilhasServicosService {
    async execute(query?: filter) {
        const repo = getRepository(TrilhaServicos);

        const where: FindConditions<TrilhaServicos> = {};

        if (query?.nome) {
            where.nome_trilha = Raw(
                (alias) => `${alias} ilike '%${query.nome}%'`
            );
        }

        const trilhas = await repo.find({
            relations: ["servicosTrilhaServicos", "tipoComponente"],
            where,
        });

        return trilhas;
    }
}
