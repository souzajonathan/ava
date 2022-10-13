import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Entidade } from "../../entities/Entidade";

export class DeleteEntidadeService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Entidade);
        const entidade = await repo.findOne(id, {
            relations: ["especificacoes"],
        });

        if (!entidade) {
            return new Error("Entidade não existe!");
        }

        if (entidade.especificacoes.length > 0) {
            return new Error(
                "Entidade com especificações das rodadas de aprovação cadastradas"
            );
        }

        await repo.delete(id);
    }
}
