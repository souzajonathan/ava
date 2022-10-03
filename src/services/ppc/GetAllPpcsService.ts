import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { Ppc } from "../../entities/Ppc";

export class GetAllPpcsService {
    async execute(curso_id?: string, instituicao_id?: string) {
        const repo = getRepository(Ppc);

        const where: FindConditions<Ppc> = {};

        if (curso_id) {
            if (!validate(curso_id)) {
                return new Error("ID de curso inválido");
            }
            where.curso_id = curso_id;
        }

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const ppcs = await repo.find({
            relations: [
                "curso",
                "ppcDisciplinaVersoes",
                "perfis",
                "competencias",
            ],
            where,
        });

        return ppcs;
    }
}
