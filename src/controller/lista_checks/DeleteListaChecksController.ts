import { Request, Response } from "express";
import { DeleteListaChecksService } from "../../services/lista_checks/DeleteListaChecksService";

export class DeleteListaChecksController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteListaChecksService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
