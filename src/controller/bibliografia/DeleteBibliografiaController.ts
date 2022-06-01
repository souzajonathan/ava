import { Request, Response } from "express";
import { DeleteBibliografiaService } from "../../services/bibliografia/DeleteBibliografiaService";

export class DeleteBibliografiaController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteBibliografiaService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}