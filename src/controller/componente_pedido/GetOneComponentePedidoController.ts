import { Request, Response } from "express";
import { GetOneComponentePedidoService } from "../../services/componente_pedido/GetOneComponentePedidoService";

export class GetOneComponentePedidoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneComponentePedidoService();

        const componentePedido = await service.execute(id);

        if (componentePedido instanceof Error) {
            return response.status(400).json(componentePedido.message);
        }

        return response.json(componentePedido);
    }
}
