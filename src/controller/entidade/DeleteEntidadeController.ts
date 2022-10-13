import { Request, Response } from "express";
import { DeleteEntidadeService } from "../../services/entidade/DeleteEntidadeService";

export class DeleteEntidadeController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteEntidadeService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
