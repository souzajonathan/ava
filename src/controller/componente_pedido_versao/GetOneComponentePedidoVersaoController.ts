import { Request, Response } from "express";
import { GetOneComponentePedidoVersaoService } from "../../services/componente_pedido_versao/GetOneComponentePedidoVersaoService";

export class GetOneComponentePedidoVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneComponentePedidoVersaoService();

        const versaoComponente = await service.execute(id);

        if (versaoComponente instanceof Error) {
            return response.status(400).json(versaoComponente.message);
        }

        return response.json(versaoComponente);
    }
}
