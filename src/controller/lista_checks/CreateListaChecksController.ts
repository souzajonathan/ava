import { Request, Response } from "express";
import { CreateListaChecksService } from "../../services/lista_checks/CreateListaChecksService";

export class CreateListaChecksController {
    async handle(request: Request, response: Response) {
        const {
            check_id,
            profissional_servico_id,
            versao_componente_pedido_id,
            check,
            observacao,
        } = request.body;

        const service = new CreateListaChecksService();

        const result = await service.execute({
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
