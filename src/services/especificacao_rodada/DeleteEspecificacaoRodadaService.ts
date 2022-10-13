import { getRepository } from "typeorm";
import { validate } from "uuid";
import { EspecificacoesRodadas } from "../../entities/EspecificacoesRodadas";

export class DeleteEspecificacaoRodadaService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(EspecificacoesRodadas);
        const especificacao = await repo.findOne(id, {
            relations: ["funcoesRodadas"],
        });

        if (!especificacao) {
            return new Error(
                "Especificação de rodada de aprovação não existe!"
            );
        }

        if (especificacao.funcoesRodadas.length > 0) {
            return new Error(
                "Especificação de rodada com funções por rodada cadastradas"
            );
        }

        await repo.delete(id);
    }
}
