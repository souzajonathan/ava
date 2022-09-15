import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";
import { ComponentesPedido } from "../../entities/ComponentesPedido";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type ComponentePedidoVersaoRequest = {
    nome: string;
    componente_pedido_id: string;
    tipo_solicitacao_id: string;
    concluido: boolean;
    cancelado: boolean;
    parent_item?: string;
};

export class CreateComponentePedidoVersaoService {
    async execute({
        nome,
        componente_pedido_id,
        tipo_solicitacao_id,
        concluido,
        cancelado,
        parent_item,
    }: ComponentePedidoVersaoRequest) {
        if (!validate(componente_pedido_id)) {
            return new Error("ID de componente de pedido inválido");
        }

        if (!validate(tipo_solicitacao_id)) {
            return new Error("ID de tipo de solicitação inválido");
        }

        if (!nome) {
            return new Error("Nome não inserido!");
        }

        if (typeof concluido != "boolean") {
            return new Error("Marcação para 'concluído' inválida");
        }

        if (typeof cancelado != "boolean") {
            return new Error("Marcação para 'cancelado' inválida");
        }

        const repoComponente = getRepository(ComponentesPedido);
        const componente = await repoComponente.findOne(componente_pedido_id);
        if (!componente) {
            return new Error("Componente de pedido não existe!");
        }

        const repoTipo = getRepository(TiposSolicitacao);
        const tipo = await repoTipo.findOne(tipo_solicitacao_id);
        if (!tipo) {
            return new Error("Tipo de solicitação não existe!");
        }

        const repo = getRepository(ComponentesPedidoVersao);
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

        const componentePedidoVersao = repo.create({
            nome,
            componente_pedido_id,
            tipo_solicitacao_id,
            concluido,
            cancelado,
            parent_item,
        });

        await repo.save(componentePedidoVersao);

        return componentePedidoVersao;
    }
}
