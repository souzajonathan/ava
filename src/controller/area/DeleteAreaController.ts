import { Request, Response } from "express";
import { DeleteAreaService } from "../../services/area/DeleteAreaService";

export class DeleteAreaController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteAreaService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}