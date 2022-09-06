import { Request, Response } from "express";
import { CreatePedidoService } from "../../services/pedido/CreatePedidoService";

export class CreatePedidoController {
    async handle(request: Request, response: Response) {
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

        const service = new CreatePedidoService();

        const result = await service.execute({
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
