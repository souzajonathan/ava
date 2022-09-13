import { getRepository } from "typeorm";
import { ComponentesPedido } from "../../entities/ComponentesPedido";

export class GetAllComponentesPedidoService {
    async execute() {
        const repo = getRepository(ComponentesPedido);

        const componentesPedido = await repo.find({
            relations: [
                "componenteChildren",
                "componenteParent",
                "tipoComponente",
                "pedido",
            ],
        });

        return componentesPedido;
    }
}
