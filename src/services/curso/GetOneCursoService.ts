import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";

export class GetOneCursoService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(Curso);

        const curso = await repo.findOne(id, {
            relations: ["ppcs", "agentes"],
        });

        if (!curso) {
            return new Error("Curso não existe!");
        }

        if (curso.instituicao_id != instituicao_id) {
            return new Error("Essa instituição não contém esse curso");
        }

        return curso;
    }
}
