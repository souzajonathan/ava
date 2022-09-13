import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedido } from "../../entities/ComponentesPedido";

type ComponentePedidoRequest = {
    pedido_id: string;
    tipo_componente_id: string;
    observacao: string;
    item_interno: boolean;
    parent_item: string;
};

export class CreateComponentePedidoService {
    async execute({
        pedido_id,
        tipo_componente_id,
        observacao,
        item_interno,
        parent_item,
    }: ComponentePedidoRequest) {
        if (!validate(pedido_id)) {
            return new Error("ID de pedido inválido");
        }

        if (!validate(tipo_componente_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (typeof item_interno != "boolean") {
            return new Error("Marcação para 'item interno' inválida");
        }

        const repo = getRepository(ComponentesPedido);

        if (parent_item) {
            if (validate(parent_item)) {
                const idAux = await repo.findOne({
                    where: { id: parent_item },
                });
                if (!idAux) {
                    return new Error("ID de item pai inexistente");
                }
            } else {
                return new Error("ID de item pai inválido");
            }
        }

        const componentePedido = repo.create({
            pedido_id,
            tipo_componente_id,
            observacao,
            item_interno,
            parent_item,
        });

        await repo.save(componentePedido);

        return componentePedido;
    }
}
