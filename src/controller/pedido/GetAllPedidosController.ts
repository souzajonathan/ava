import { Request, Response } from "express";
import { GetAllPedidosService } from "../../services/pedido/GetAllPedidosService";

export class GetAllPedidosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPedidosService();

        const pedidos = await service.execute(
            request.query?.disciplina_versao_id as string,
            request.query?.responsavel_id as string,
            request.query?.solicitante_id as string
        );

        return response.json(pedidos);
    }
}
