import { Request, Response } from "express";
import { UpdateAreaService } from "../../services/area/UpdateAreaService";

export class UpdateAreaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, description, instituicao_id } = request.body;

        const service = new UpdateAreaService();

        const result = await service.execute({
            id,
            name,
            description,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
