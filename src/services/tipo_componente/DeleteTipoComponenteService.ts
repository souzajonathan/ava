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
            relations: ["componentesTrilha", "componentesPedido"],
        });

        if (!tipo) {
            return new Error("Tipo de componente não existe!");
        }

        if (tipo.componentesTrilha.length > 0) {
            return new Error(
                "Tipo de componente com componentes de trilha cadastrados"
            );
        }

        if (tipo.componentesPedido.length > 0) {
            return new Error(
                "Tipo de componente com componentes de pedido cadastrados"
            );
        }

        await repo.delete(id);
    }
}
