import { Request, Response } from "express";
import { CalculoPedidoService } from "../../services/pedido/CalculoPedidoService";

export class CalculoPedidoController {
    async handle (request: Request, response: Response) {
        const { dateLeft, dateRight } = request.body;

        const service = new CalculoPedidoService();

        const result = await service.execute({
            dateLeft,
            dateRight
        });

        return response.json(result);
    }
}