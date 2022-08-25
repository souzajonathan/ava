import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

type CursoRequest = {
    name: string;
    active: boolean;
};

export class CreateCursoService {
    async execute({ name, active }: CursoRequest) {
        if (!name) {
            return new Error("Nome de curso é obrigatório");
        }

        if (active && typeof active != "boolean") {
            return new Error("Marcação para 'ativo' inválida");
        }

        const repo = getRepository(Curso);

        const cursoAlreadyExists = await repo.findOne({ name });
        if (cursoAlreadyExists) {
            return new Error("Curso já existe");
        }

        const curso = repo.create({
            name,
            active,
        });

        await repo.save(curso);

        return curso;
    }
}
