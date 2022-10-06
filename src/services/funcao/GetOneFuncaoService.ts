import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";

export class GetOneFuncaoService {
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

        return funcao;
    }
}
