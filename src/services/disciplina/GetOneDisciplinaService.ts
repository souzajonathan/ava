import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";

export class GetOneDisciplinaService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(Disciplina);

        const disciplina = await repo.findOne(id, {
            relations: ["area", "versoes"],
        });

        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        if (disciplina.instituicao_id != instituicao_id) {
            return new Error("Essa instituição não contém essa disciplina");
        }

        return disciplina;
    }
}
