import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

type CursoUpdateRequest = {
    id: string;
    name: string;
    ppcAtivo: string;
};

export class UpdateCursoService {
    async execute ({id, name, ppcAtivo}: CursoUpdateRequest) {
        const repo = getRepository(Curso);

        const curso = await repo.findOne(id);

        if (!curso) {
            return new Error("Curso não existe!");
        }

        curso.name = name ? name : curso.name;
        curso.ppcAtivo = ppcAtivo ? ppcAtivo : curso.ppcAtivo;

        await repo.save(curso);

        return curso;
    }
}