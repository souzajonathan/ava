import { Request, Response } from "express";
import { DeleteDisciplinaService } from "../services/DeleteDisciplinaService";

export class DeleteDisciplinaController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteDisciplinaService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}