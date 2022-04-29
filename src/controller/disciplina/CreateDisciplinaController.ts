import { Request, Response } from "express";
import { CreateDisciplinaService } from "../../services/disciplina/CreateDisciplinaService";

export class CreateDisciplinaController {
    async handle (request: Request, response: Response) {
        const {name, area_id} = request.body;

        const service = new CreateDisciplinaService();

        const result = await service.execute({
            name,
            area_id
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}