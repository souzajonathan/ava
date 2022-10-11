import { Request, Response } from "express";
import { DeleteAgenteService } from "../../services/agente/DeleteAgenteService";

export class DeleteAgenteController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteAgenteService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
