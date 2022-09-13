import { Request, Response } from "express";
import { DeleteComponenteTrilhaComponentesService } from "../../services/componente_trilha_componente/DeleteComponenteTrilhaComponentesService";

export class DeleteComponenteTrilhaoComponentesController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteComponenteTrilhaComponentesService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
