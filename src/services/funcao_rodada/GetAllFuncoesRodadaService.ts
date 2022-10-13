import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { FuncoesRodada } from "../../entities/FuncoesRodada";

export class GetAllFuncoesRodadaService {
    async execute(especificacao_id?: string, instituicao_id?: string) {
        const repo = getRepository(FuncoesRodada);

        const where: FindConditions<FuncoesRodada> = {};

        if (especificacao_id) {
            if (!validate(especificacao_id)) {
                return new Error(
                    "ID de especificação da rodada de aprovação inválido"
                );
            }
            where.especificacao_id = especificacao_id;
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const funcoes = await repo.find({
            relations: ["especificacao", "funcao", "instituicao"],
            where,
        });

        return funcoes;
    }
}
