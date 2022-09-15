import { Request, Response } from "express";
import { DeleteComponentePedidoVersaoService } from "../../services/componente_pedido_versao/DeleteComponentePedidoVersaoService";

export class DeleteComponentePedidoVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteComponentePedidoVersaoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
