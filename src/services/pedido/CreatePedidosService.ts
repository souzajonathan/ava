import { CreatePedidoService } from "./CreatePedidoService";

type Pedido = {
    disciplina_versao_id: string;
    tipo_solicitacao_id: string;
    data_entrega: Date;
    analisado: boolean;
    aprovacao_interna: boolean;
    aprovacao_externa: boolean;
    concluido: boolean;
    observacoes: string;
    solicitante_id: string;
    responsavel_id: string;
};

type PedidosRequest = {
    pedidos: Pedido[];
};

export class CreatePedidosService {
    async execute({ pedidos }: PedidosRequest) {
        for await (const pedido of pedidos) {
            const service = new CreatePedidoService();

            const result = await service.execute({
                disciplina_versao_id: pedido.disciplina_versao_id,
                tipo_solicitacao_id: pedido.tipo_solicitacao_id,
                data_entrega: pedido.data_entrega,
                analisado: pedido.analisado,
                aprovacao_interna: pedido.aprovacao_interna,
                aprovacao_externa: pedido.aprovacao_externa,
                concluido: pedido.concluido,
                observacoes: pedido.observacoes,
                solicitante_id: pedido.solicitante_id,
                responsavel_id: pedido.responsavel_id,
            });

            if (result instanceof Error) {
                return result;
            }
        }

        return pedidos;
    }
}
