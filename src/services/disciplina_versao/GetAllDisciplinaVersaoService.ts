import { FindConditions, getRepository } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetAllDisciplinaVersoesService {
    async execute(disciplina_id?: string) {
        const repo = getRepository(DisciplinaVersao);

        const where: FindConditions<DisciplinaVersao> = {};

        if (disciplina_id){
            where.disciplina_id = disciplina_id;
        }

        const versoes = await repo.find({
            relations: ["disciplina", "ppcDisciplinaVersoes", "bibliografias"],
            where
        });

        return versoes;
    }
}