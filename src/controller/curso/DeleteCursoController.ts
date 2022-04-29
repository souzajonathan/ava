import { Request, Response } from "express";
import { DeleteCursoService } from "../../services/curso/DeleteCursoService";

export class DeleteCursoController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteCursoService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}