import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

export class GetOneTipoSolicitacaoService {
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

        return tipo;
    }
}
