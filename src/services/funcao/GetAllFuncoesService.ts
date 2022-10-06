import { getRepository } from "typeorm";
import { Funcao } from "../../entities/Funcao";

export class GetAllFuncoesService {
    async execute() {
        const repo = getRepository(Funcao);

        const funcoes = await repo.find({
            relations: ["agentes", "funcoesRodadas"],
        });

        return funcoes;
    }
}
