import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

export class GetAllCursosService {
    async execute() {
        const repo = getRepository(Curso);

        const cursos = await repo.find({
            relations: ["ppcs"]
        });

        return cursos;
    }
}