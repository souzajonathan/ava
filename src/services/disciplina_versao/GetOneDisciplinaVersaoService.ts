import { FindConditions, getRepository } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetOneDisciplinaVersaoService {
    async execute(id?: string) {
        const repo = getRepository(DisciplinaVersao);

        const where: FindConditions<DisciplinaVersao> = {};

        if (id){
            where.id = id;
        }

        const versao = await repo.find({
            relations: ["disciplina"],
            where
        });

        return versao;
    }

}