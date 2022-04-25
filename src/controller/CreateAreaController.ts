import { Request, Response } from "express";
import { CreateAreaService } from "../services/CreateAreaService";

export class CreateAreaController {
    async handle (request: Request, response: Response) {
        const { name, description } = request.body;

        const service = new CreateAreaService();

        const result = await service.execute({
            name,
            description
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}