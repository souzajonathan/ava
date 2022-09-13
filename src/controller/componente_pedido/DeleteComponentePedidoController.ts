import { Request, Response } from "express";
import { DeleteComponentePedidoService } from "../../services/componente_pedido/DeleteComponentePedidoService";

export class DeleteComponentePedidoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteComponentePedidoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
