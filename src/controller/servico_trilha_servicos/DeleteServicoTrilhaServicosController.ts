import { Request, Response } from "express";
import { DeleteServicoTrilhaServicosService } from "../../services/servico_trilha_servicos/DeleteServicoTrilhaServicosService";

export class DeleteServicoTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteServicoTrilhaServicosService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
