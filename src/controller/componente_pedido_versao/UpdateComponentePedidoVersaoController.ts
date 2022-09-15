import { Request, Response } from "express";
import { UpdateComponentePedidoVersaoService } from "../../services/componente_pedido_versao/UpdateComponentePedidoVersaoService";

export class UpdateComponentePedidoVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            nome,
            componente_pedido_id,
            tipo_solicitacao_id,
            concluido,
            cancelado,
            parent_item,
        } = request.body;

        const service = new UpdateComponentePedidoVersaoService();

        const result = await service.execute({
            id,
            nome,
            componente_pedido_id,
            tipo_solicitacao_id,
            concluido,
            cancelado,
            parent_item,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
