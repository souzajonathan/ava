import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedido } from "../../entities/ComponentesPedido";
import { Pedido } from "../../entities/Pedido";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { CreateComponentePedidoVersaoService } from "../componente_pedido_versao/CreateComponentePedidoVersaoService";

type ComponentePedidoRequest = {
    pedido_id: string;
    tipo_componente_id: string;
    observacao: string;
    item_interno: boolean;
    parent_item?: string;
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

        const repoPedido = getRepository(Pedido);
        const pedido = await repoPedido.findOne(pedido_id);
        if (!pedido) {
            return new Error("Pedido não existe!");
        }

        const repoTipoComponente = getRepository(TiposComponentes);
        const tipoComponente = await repoTipoComponente.findOne(
            tipo_componente_id
        );
        if (!tipoComponente) {
            return new Error("Tipo de componente não existe!");
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

        if (parent_item) {
            const componentePai = await repo.findOne(parent_item, {
                relations: ["componenteParent"],

                //BIRULEIBE
            });
        } else {
            const service = new CreateComponentePedidoVersaoService();

            const repoPedido = getRepository(Pedido);
            const pedido = await repoPedido.findOne(pedido_id, {
                relations: ["tipoSolicitacao"],
            });
            const tipoSolicitacao = pedido.tipoSolicitacao.tipo;

            const result = await service.execute({
                nome: "principal",
                componente_pedido_id: componentePedido.id,
                tipo_solicitacao_id: tipoSolicitacao,
                concluido: false,
                cancelado: false,
            });

            if (result instanceof Error) {
                return result;
            }
        }

        return componentePedido;
    }
}
