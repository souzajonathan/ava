import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

export class DeleteTipoSolicitacaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposSolicitacao);
        const tipo = await repo.findOne(id, {
            relations: ["pedidos"],
        });

        if (!tipo) {
            return new Error("Tipo de solicitação não existe!");
        }

        if (tipo.pedidos.length > 0) {
            return new Error("Tipo de solicitação com pedidos cadastrados");
        }

        await repo.delete(id);
    }
}
