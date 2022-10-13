import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Entidade } from "../../entities/Entidade";

export class GetOneEntidadeService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(Entidade);

        const entidade = await repo.findOne(id, {
            relations: ["especificacoes", "instituicao"],
        });

        if (!entidade) {
            return new Error("Entidade não existe!");
        }

        if (entidade.instituicao_id != instituicao_id) {
            return new Error("Essa instituição não contém essa entidade");
        }

        return entidade;
    }
}
