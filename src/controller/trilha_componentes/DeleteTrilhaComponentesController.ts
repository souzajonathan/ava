import { Request, Response } from "express";
import { DeleteTrilhaComponentesService } from "../../services/trilha_componentes/DeleteTrilhaComponentesService";

export class DeleteTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteTrilhaComponentesService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
