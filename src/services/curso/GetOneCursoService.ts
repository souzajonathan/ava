import { FindConditions, getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

export class GetOneCursoService {
    async execute(id?: string) {
        const repo = getRepository(Curso);

        const where: FindConditions<Curso> = {};

        if (id){
            where.id = id;
        }

        const curso = await repo.findOne({
            relations: ["ppcs"],
            where
        });

        return curso;
    }

}