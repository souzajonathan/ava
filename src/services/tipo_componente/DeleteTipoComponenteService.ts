import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposComponentes } from "../../entities/TiposComponentes";

export class DeleteTipoComponenteService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposComponentes);
        const tipo = await repo.findOne(id, {
            relations: [
                "componentesTrilha",
                "componentesPedido",
                "trilhasServicos",
                "checksTipoServico",
            ],
        });

        if (!tipo) {
            return new Error("Tipo de componente não existe!");
        }

        if (tipo.componentesTrilha.length > 0) {
            return new Error(
                "Tipo de componente com componente(s) de trilha cadastrado(s)"
            );
        }

        if (tipo.componentesPedido.length > 0) {
            return new Error(
                "Tipo de componente com componente(s) de pedido cadastrado(s)"
            );
        }

        if (tipo.trilhasServicos.length > 0) {
            return new Error(
                "Tipo de componente com trilha(s) de serviço cadastrado(s)"
            );
        }

        if (tipo.checksTipoServico.length > 0) {
            return new Error(
                "Tipo de componente com check(s) de tipo de serviço cadastrado(s)"
            );
        }

        await repo.delete(id);
    }
}
