import { getRepository } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetOneDisciplinaVersaoService {
    async execute(id: string) {

        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(DisciplinaVersao);

        const versao = await repo.findOne(id, {
            relations: ["disciplina", "ppcDisciplinaVersoes", "bibliografias"]
        });

        if (!versao) {
            return new Error("Versão de disciplina não existe!");
        }

        return versao;
    }

}