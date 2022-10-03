import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";

type CursoRequest = {
    name: string;
    active: boolean;
    instituicao_id: string;
};

export class CreateCursoService {
    async execute({ name, active, instituicao_id }: CursoRequest) {
        if (!name) {
            return new Error("Nome de curso é obrigatório");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
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
            instituicao_id,
        });

        await repo.save(curso);

        return curso;
    }
}
