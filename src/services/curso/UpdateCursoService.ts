import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

type CursoUpdateRequest = {
    id: string;
    name: string;
    pccAtivo: string;
};

export class UpdateCursoService {
    async execute ({id, name, pccAtivo}: CursoUpdateRequest) {
        const repo = getRepository(Curso);

        const curso = await repo.findOne(id);

        if (!curso) {
            return new Error("Curso não existe!");
        }

        curso.name = name ? name : curso.name;
        curso.pccAtivo = pccAtivo ? pccAtivo : curso.pccAtivo;

        await repo.save(curso);

        return curso;
    }
}