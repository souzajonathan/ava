import { getRepository } from "typeorm";
import { validate } from "uuid";
import { FuncoesRodada } from "../../entities/FuncoesRodada";

export class DeleteFuncaoRodadaService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(FuncoesRodada);
        const funcao = await repo.findOne(id);

        if (!funcao) {
            return new Error("Função por rodada de aprovação não existe!");
        }

        await repo.delete(id);
    }
}
