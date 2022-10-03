import { FindConditions, getRepository, Raw } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";

type filter = {
    nome?: string;
};

export class GetAllDisciplinasService {
    async execute(query?: filter, area_id?: string, instituicao_id?: string) {
        const repo = getRepository(Disciplina);

        const where: FindConditions<Disciplina> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        if (area_id) {
            if (!validate(area_id)) {
                return new Error("ID de instituição inválido");
            }
            where.area_id = area_id;
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const disciplinas = await repo.find({
            relations: ["area", "versoes"],
            where,
        });

        return disciplinas;
    }
}
