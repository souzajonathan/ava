import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

export class GetOneCursoService {
    async execute(id: string) {
        const repo = getRepository(Curso);

        const curso = await repo.findOne(id, {
            relations: ["ppcs"]
        });

        if (!curso) {
            return new Error("Curso não existe!");
        }

        return curso;
    }

}