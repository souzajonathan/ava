import { FindConditions, getRepository, Raw } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type filter = {
    code?: string;
    syllabus?: string;
};

export class GetAllDisciplinaVersoesService {
    async execute(
        query?: filter,
        disciplina_id?: string,
        instituicao_id?: string
    ) {
        const repo = getRepository(DisciplinaVersao);

        const where: FindConditions<DisciplinaVersao> = {};

        if (query?.code) {
            where.codigo = Raw((alias) => `${alias} ilike '%${query.code}%'`);
        }

        if (query?.syllabus) {
            where.ementa = Raw(
                (alias) => `${alias} ilike '%${query.syllabus}%'`
            );
        }

        if (disciplina_id) {
            if (!validate(disciplina_id)) {
                return new Error("ID de disciplina inválido");
            }
            where.disciplina_id = disciplina_id;
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const versoes = await repo.find({
            relations: ["disciplina", "ppcDisciplinaVersoes", "bibliografias"],
            where,
        });

        return versoes;
    }
}
