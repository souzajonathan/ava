import { Request, Response } from "express";
import { CreateComponentePedidoService } from "../../services/componente_pedido/CreateComponentePedidoService";

export class CreateComponentePedidoController {
    async handle(request: Request, response: Response) {
        const {
            pedido_id,
            tipo_componente_id,
            observacao,
            item_interno,
            parent_item,
        } = request.body;

        const service = new CreateComponentePedidoService();

        const result = await service.execute({
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
