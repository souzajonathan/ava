import { Request, Response } from "express";
import { UpdateComponentePedidoService } from "../../services/componente_pedido/UpdateComponentePedidoService";

export class UpdateComponentePedidoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            pedido_id,
            tipo_componente_id,
            observacao,
            item_interno,
            parent_item,
        } = request.body;

        const service = new UpdateComponentePedidoService();

        const result = await service.execute({
            id,
            pedido_id,
            tipo_componente_id,
            observacao,
            item_interno,
            parent_item,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
