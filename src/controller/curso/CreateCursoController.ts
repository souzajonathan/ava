import { Request, Response } from "express";
import { CreateCursoService } from "../../services/curso/CreateCursoService";

export class CreateCursoController {
    async handle (request: Request, response: Response) {
        const { name, pccAtivo } = request.body;

        const service = new CreateCursoService();

        const result = await service.execute({
            name,
            pccAtivo
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}