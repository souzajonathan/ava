import { Request, Response } from "express";
import { GetOnePedidoService } from "../../services/pedido/GetOnePedidoService";

export class GetOnePedidoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOnePedidoService();

        const pedido = await service.execute(id);

        if (pedido instanceof Error) {
            return response.status(400).json(pedido.message);
        }

        return response.json(pedido);
    }
}
