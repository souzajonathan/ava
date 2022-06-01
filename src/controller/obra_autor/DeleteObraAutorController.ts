import { Request, Response } from "express";
import { DeleteObraAutorService } from "../../services/obra_autor/DeleteObraAutorService";

export class DeleteObraAutorController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteObraAutorService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}