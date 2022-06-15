import { FindConditions, getRepository, Raw } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";

type filter = {
    nome?: string;
}

export class GetAllDisciplinasService {
    async execute(query?:filter, area_id?: string) {
        const repo = getRepository(Disciplina);

        const where: FindConditions<Disciplina> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        if (area_id) {
            where.area_id = area_id;
        }

        const disciplinas = await repo.find({
            relations: ["area", "versoes"],
            where
        });

        return disciplinas;
    }
}