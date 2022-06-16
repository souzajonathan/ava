import { FindConditions, getRepository, Raw } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type filter = {
    code?: string;
    syllabus?: string;
}

export class GetAllDisciplinaVersoesService {
    async execute(query?: filter, disciplina_id?: string) {
        const repo = getRepository(DisciplinaVersao);

        const where: FindConditions<DisciplinaVersao> = {};

        if (query?.code) {
            where.codigo = Raw((alias) => `${alias} ilike '%${query.code}%'`);
        }

        if (query?.syllabus) {
            where.ementa = Raw((alias) => `${alias} ilike '%${query.syllabus}%'`);
        }

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