import { getRepository } from "typeorm";
import { validate } from "uuid";
import { EspecificacoesRodadas } from "../../entities/EspecificacoesRodadas";

export class GetOneEspecificacaoRodadaService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(EspecificacoesRodadas);

        const especificacaoRodada = await repo.findOne(id, {
            relations: ["funcoesRodadas", "entidade", "instituicao"],
        });

        if (!especificacaoRodada) {
            return new Error(
                "Especificação de rodada de aprovação não existe!"
            );
        }

        if (especificacaoRodada.instituicao_id != instituicao_id) {
            return new Error(
                "Essa instituição não contém essa especificação de rodada de aprovação"
            );
        }

        return especificacaoRodada;
    }
}
