import { getRepository } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetOneDisciplinaVersaoService {
    async execute(id: string) {
        const repo = getRepository(DisciplinaVersao);

        const versao = await repo.findOne(id, {
            relations: ["disciplina", "ppcDisciplinaVersoes"]
        });

        if (!versao) {
            return new Error("Versão de disciplina não existe!");
        }

        return versao;
    }

}