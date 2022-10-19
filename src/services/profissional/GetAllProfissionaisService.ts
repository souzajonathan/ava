import { FindConditions, getRepository, Raw } from "typeorm";
import { validate } from "uuid";
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
            relations: ["profissionalServicos", "funcoes"],
            where,
        });

        return profissionais;
    }

    async findByFuncao(funcao_id: string) {
        if (!validate(funcao_id)) {
            return new Error("ID inválido");
        }
        const repo = getRepository(Profissional);

        const profissionais = await repo
            .createQueryBuilder("profissional")
            .leftJoinAndSelect(
                "profissional.profissionalServicos",
                "profissionalServicos"
            )
            .leftJoinAndSelect("profissional.funcoes", "funcoes")
            .where("funcoes.id = :id", { id: funcao_id })
            .getMany();

        if (!profissionais.length) {
            return new Error(
                "Não foram encontrados profissionais com essa função"
            );
        }

        return profissionais;
    }
}
