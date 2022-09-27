import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedido } from "../../entities/ComponentesPedido";

type ComponentePedidoUpdateRequest = {
    id: string;
    pedido_id: string;
    tipo_componente_id: string;
    observacao: string;
    item_interno: boolean;
    parent_item: string;
};

export class UpdateComponentePedidoService {
    async execute({
        id,
        pedido_id,
        tipo_componente_id,
        observacao,
        item_interno,
        parent_item,
    }: ComponentePedidoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (pedido_id && !validate(pedido_id)) {
            return new Error("ID de pedido inválido");
        }

        if (tipo_componente_id && !validate(tipo_componente_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (item_interno && typeof item_interno != "boolean") {
            return new Error("Marcação para 'item interno' inválida");
        }

        const repo = getRepository(ComponentesPedido);
        const componentePedido = await repo.findOne(id);
        if (!componentePedido) {
            return new Error("Componente de Pedido não existe!");
        }

        if (parent_item) {
            if (validate(parent_item)) {
                if (!(id == parent_item)) {
                    const idAux = await repo.findOne({
                        where: { id: parent_item },
                    });
                    if (!idAux) {
                        return new Error("ID de item pai inexistente");
                    }
                } else {
                    return new Error(
                        "Não é possível editar um componente e inseri-lo nele mesmo"
                    );
                }
            } else {
                return new Error("ID de item pai inválido");
            }
        }

        componentePedido.pedido_id = pedido_id
            ? pedido_id
            : componentePedido.pedido_id;
        componentePedido.tipo_componente_id = tipo_componente_id
            ? tipo_componente_id
            : componentePedido.tipo_componente_id;
        componentePedido.observacao = observacao
            ? observacao
            : componentePedido.observacao;
        if (item_interno != undefined && item_interno != null) {
            componentePedido.item_interno = item_interno;
        }
        componentePedido.parent_item = parent_item
            ? parent_item
            : componentePedido.parent_item;

        await repo.save(componentePedido);

        return componentePedido;
    }
}
