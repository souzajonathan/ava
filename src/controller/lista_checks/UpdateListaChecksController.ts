import { Request, Response } from "express";
import { UpdateListaChecksService } from "../../services/lista_checks/UpdateListaChecksService";

export class UpdateListaChecksController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            check_id,
            profissional_servico_id,
            versao_componente_pedido_id,
            check,
            observacao,
        } = request.body;

        const service = new UpdateListaChecksService();

        const result = await service.execute({
            id,
            check_id,
            profissional_servico_id,
            versao_componente_pedido_id,
            check,
            observacao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
