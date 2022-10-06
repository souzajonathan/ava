import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";

export class DeleteFuncaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Funcao);
        const funcao = await repo.findOne(id, {
            relations: ["agentes", "funcoesRodadas"],
        });

        if (!funcao) {
            return new Error("Função não existe!");
        }

        if (funcao.agentes.length > 0) {
            return new Error("Função com agentes cadastrados");
        }

        if (funcao.funcoesRodadas.length > 0) {
            return new Error("Função com rodadas de aprovação cadastradas");
        }

        await repo.delete(id);
    }
}
