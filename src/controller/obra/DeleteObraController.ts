import { Request, Response } from "express";
import { DeleteObraService } from "../../services/obra/DeleteObraService";

export class DeleteObraController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteObraService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}