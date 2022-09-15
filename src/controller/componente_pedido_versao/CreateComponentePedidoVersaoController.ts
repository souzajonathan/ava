import { Request, Response } from "express";
import { CreateComponentePedidoVersaoService } from "../../services/componente_pedido_versao/CreateComponentePedidoVersaoService";

export class CreateComponentePedidoVersaoController {
    async handle(request: Request, response: Response) {
        const {
            nome,
            componente_pedido_id,
            tipo_solicitacao_id,
            concluido,
            cancelado,
            parent_item,
        } = request.body;

        const service = new CreateComponentePedidoVersaoService();

        const result = await service.execute({
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
