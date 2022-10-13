import { getRepository } from "typeorm";
import { validate } from "uuid";
import { FuncoesRodada } from "../../entities/FuncoesRodada";

export class GetOneFuncaoRodadaService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(FuncoesRodada);

        const funcao = await repo.findOne(id, {
            relations: ["especificacao", "funcao", "instituicao"],
        });

        if (!funcao) {
            return new Error("Função por rodada de aprovação não existe!");
        }

        if (funcao.instituicao_id != instituicao_id) {
            return new Error(
                "Essa instituição não contém essa função por rodada de aprovação"
            );
        }

        return funcao;
    }
}
