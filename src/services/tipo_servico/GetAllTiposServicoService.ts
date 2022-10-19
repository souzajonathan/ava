import { FindConditions, getRepository, Raw } from "typeorm";
import { validate } from "uuid";
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
            relations: ["servicos", "servicosTrilhaServicos", "funcoes"],
            where,
        });

        return tipos;
    }

    async findByFuncao(funcao_id: string) {
        if (!validate(funcao_id)) {
            return new Error("ID inválido");
        }
        const repo = getRepository(TiposServicos);

        const tipos = await repo
            .createQueryBuilder("tipo")
            .leftJoinAndSelect("tipo.servicos", "servicos")
            .leftJoinAndSelect(
                "tipo.servicosTrilhaServicos",
                "servicosTrilhaServicos"
            )
            .leftJoinAndSelect("tipo.funcoes", "funcoes")
            .where("funcoes.id = :id", { id: funcao_id })
            .getMany();

        if (!tipos.length) {
            return new Error(
                "Não foram encontrados tipos de serviço cadastrados com essa função"
            );
        }

        return tipos;
    }
}
