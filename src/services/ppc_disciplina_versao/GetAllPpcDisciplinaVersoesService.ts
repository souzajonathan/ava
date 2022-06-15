import { getRepository } from "typeorm";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetAllPpcDisciplinaVersoesService {
    async execute() {
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersoes = await repo.find({
            relations: ["ppc", "versoes", "perfis", "competencias"]
        });

        return ppcDisciplinaVersoes;
    }
}