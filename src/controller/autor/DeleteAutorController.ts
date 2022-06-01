import { Request, Response } from "express";
import { DeleteAutorService } from "../../services/autor/DeleteAutorService";

export class DeleteAutorController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteAutorService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}