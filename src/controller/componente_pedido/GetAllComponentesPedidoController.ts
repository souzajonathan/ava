import { Request, Response } from "express";
import { GetAllComponentesPedidoService } from "../../services/componente_pedido/GetAllComponentesPedidoService";

export class GetAllComponentesPedidoController {
    async handle(request: Request, response: Response) {
        const service = new GetAllComponentesPedidoService();

        const componentesPedido = await service.execute();

        return response.json(componentesPedido);
    }
}
