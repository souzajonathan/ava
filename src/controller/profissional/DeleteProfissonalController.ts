import { Request, Response } from "express";
import { DeleteProfissionalService } from "../../services/profissional/DeleteProfissionalService";

export class DeleteProfissionalController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteProfissionalService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
