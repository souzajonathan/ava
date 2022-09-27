import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";
import { ComponentesPedido } from "../../entities/ComponentesPedido";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type ComponentePedidoVersaoUpdateRequest = {
    id: string;
    nome: string;
    componente_pedido_id: string;
    tipo_solicitacao_id: string;
    concluido: boolean;
    cancelado: boolean;
    parent_item: string;
};

export class UpdateComponentePedidoVersaoService {
    async execute({
        id,
        nome,
        componente_pedido_id,
        tipo_solicitacao_id,
        concluido,
        cancelado,
        parent_item,
    }: ComponentePedidoVersaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (componente_pedido_id && !validate(componente_pedido_id)) {
            return new Error("ID de componente de pedido inválido");
        }

        if (tipo_solicitacao_id && !validate(tipo_solicitacao_id)) {
            return new Error("ID de tipo de solicitação inválido");
        }

        if (concluido && typeof concluido != "boolean") {
            return new Error("Marcação para 'concluído' inválida");
        }

        if (cancelado && typeof cancelado != "boolean") {
            return new Error("Marcação para 'cancelado' inválida");
        }

        const repo = getRepository(ComponentesPedidoVersao);
        const componentePedidoVersao = await repo.findOne(id);
        if (!componentePedidoVersao) {
            return new Error("Versão de Componente de Pedido não existe!");
        }

        const repoComponente = getRepository(ComponentesPedido);
        const componente = await repoComponente.findOne(componente_pedido_id, {
            relations: ["versoes"],
        });
        if (!componente) {
            return new Error("Componente de pedido não existe!");
        }

        const repoTipo = getRepository(TiposSolicitacao);
        const tipo = await repoTipo.findOne(tipo_solicitacao_id);
        if (!tipo) {
            return new Error("Tipo de solicitação não existe!");
        }

        if (nome && componente.versoes.length == 1) {
            return new Error(
                "Não é possível editar o nome da versão principal do componente de pedido!"
            );
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

        componentePedidoVersao.nome = nome ? nome : componentePedidoVersao.nome;
        componentePedidoVersao.componente_pedido_id = componente_pedido_id
            ? componente_pedido_id
            : componentePedidoVersao.componente_pedido_id;
        componentePedidoVersao.tipo_solicitacao_id = tipo_solicitacao_id
            ? tipo_solicitacao_id
            : componentePedidoVersao.tipo_solicitacao_id;
        if (concluido != undefined && concluido != null) {
            componentePedidoVersao.concluido = concluido;
        }
        if (cancelado != undefined && cancelado != null) {
            componentePedidoVersao.cancelado = cancelado;
        }
        componentePedidoVersao.parent_item = parent_item
            ? parent_item
            : componentePedidoVersao.parent_item;

        await repo.save(componentePedidoVersao);

        return componentePedidoVersao;
    }
}
