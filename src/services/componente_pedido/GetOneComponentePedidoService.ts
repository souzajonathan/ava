import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedido } from "../../entities/ComponentesPedido";

export class GetOneComponentePedidoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesPedido);

        const componentePedido = await repo.findOne(id, {
            relations: [
                "componenteChildren",
                "componenteParent",
                "tipoComponente",
                "pedido",
                "versoes",
            ],
        });

        if (!componentePedido) {
            return new Error("Componente de Pedido não existe!");
        }

        return componentePedido;
    }
}
