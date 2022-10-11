import { Request, Response } from "express";
import { DeleteTrilhaServicosService } from "../../services/trilha_servicos/DeleteTrilhaServicosService";

export class DeleteTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteTrilhaServicosService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
