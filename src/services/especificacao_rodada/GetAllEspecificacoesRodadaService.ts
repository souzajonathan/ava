import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { EspecificacoesRodadas } from "../../entities/EspecificacoesRodadas";

export class GetAllEspecificacoesRodadaService {
    async execute(entidade_id?: string, instituicao_id?: string) {
        const repo = getRepository(EspecificacoesRodadas);

        const where: FindConditions<EspecificacoesRodadas> = {};

        if (entidade_id) {
            if (!validate(entidade_id)) {
                return new Error("ID de entidade inválido");
            }
            where.entidade_id = entidade_id;
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const especificacoes = await repo.find({
            relations: ["funcoesRodadas", "entidade", "instituicao"],
            where,
        });

        return especificacoes;
    }
}
