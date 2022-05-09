import { getRepository } from "typeorm";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetAllPpcDisciplinaVersaoService {
    async execute() {
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.find();

        return ppcDisciplinaVersao;
    }
}