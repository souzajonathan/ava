import { Request, Response } from "express";
import { CreateAreaService } from "../../services/area/CreateAreaService";

export class CreateAreaController {
    async handle(request: Request, response: Response) {
        const { name, description, instituicao_id } = request.body;

        const service = new CreateAreaService();

        const result = await service.execute({
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
