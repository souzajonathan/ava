import { Request, Response } from "express";
import { GetAllComponentesPedidoVersaoService } from "../../services/componente_pedido_versao/GetAllComponentesPedidoVersaoService";

export class GetAllComponentePedidoVersoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllComponentesPedidoVersaoService();

        const versoesComponente = await service.execute();

        return response.json(versoesComponente);
    }
}
