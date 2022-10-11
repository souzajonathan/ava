import { Request, Response } from "express";
import { CreateProfissionalService } from "../../services/profissional/CreateProfissionalService";

export class CreateProfissionalController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const service = new CreateProfissionalService();

        const result = await service.execute({
            name,
            description,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
