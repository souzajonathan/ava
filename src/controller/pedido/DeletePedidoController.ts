import { Request, Response } from "express";
import { DeletePedidoService } from "../../services/pedido/DeletePedidoService";

export class DeletePedidoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeletePedidoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
