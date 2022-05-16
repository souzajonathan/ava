import { FindConditions, getRepository, Raw } from "typeorm";
import { Curso } from "../../entities/Curso";

type filter = {
    nome?: string;
}

export class GetAllCursosService {
    async execute(query?:filter) {
        const repo = getRepository(Curso);

        const where: FindConditions<Curso> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        const cursos = await repo.find({
            relations: ["ppcs"],
            where
        });

        return cursos;
    }
}