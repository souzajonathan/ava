import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetOnePpcDisciplinaVersaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.findOne(id, {
            relations: [
                "ppc",
                "versao",
                "perfis",
                "competencias",
                "versao.disciplina",
            ],
        });

        if (!ppcDisciplinaVersao) {
            return new Error("PpcDisciplinaVersao não existe!");
        }

        return ppcDisciplinaVersao;
    }
}
