import { FindConditions, getRepository, Raw } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";

type filter = {
    nome?: string;
};

export class GetAllCursosService {
    async execute(query?: filter, instituicao_id?: string) {
        const repo = getRepository(Curso);

        const where: FindConditions<Curso> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const cursos = await repo.find({
            relations: ["ppcs"],
            where,
        });

        return cursos;
    }
}
