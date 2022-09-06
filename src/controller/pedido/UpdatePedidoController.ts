import { Request, Response } from "express";
import { UpdatePedidoService } from "../../services/pedido/UpdatePedidoService";

export class UpdatePedidoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            disciplina_versao_id,
            tipo_solicitacao_id,
            data_entrega,
            analisado,
            aprovacao_interna,
            aprovacao_externa,
            concluido,
            observacoes,
            solicitante_id,
            responsavel_id,
        } = request.body;

        const service = new UpdatePedidoService();

        const result = await service.execute({
            id,
            disciplina_versao_id,
            tipo_solicitacao_id,
            data_entrega,
            analisado,
            aprovacao_interna,
            aprovacao_externa,
            concluido,
            observacoes,
            solicitante_id,
            responsavel_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
