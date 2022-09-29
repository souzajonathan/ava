import { getRepository } from "typeorm";
import { Instituicao } from "../../entities/Instituicao";

export class GetAllInstituicoesService {
    async execute() {
        const repo = getRepository(Instituicao);

        const instituicoes = await repo.find();

        return instituicoes;
    }
}
