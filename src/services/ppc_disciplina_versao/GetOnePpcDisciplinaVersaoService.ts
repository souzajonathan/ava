import { getRepository } from "typeorm";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetOnePpcDisciplinaVersaoService {
    async execute(id: string) {
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.findOne(id, {
            relations: ["ppc", "versoes", "perfis", "competencias"]
        });

        if (!ppcDisciplinaVersao) {
            return new Error("PpcDisciplinaVersao não existe!");
        }

        return ppcDisciplinaVersao;
    }
}