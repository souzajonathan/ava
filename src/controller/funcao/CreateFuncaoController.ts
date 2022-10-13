import { Request, Response } from "express";
import { CreateFuncaoService } from "../../services/funcao/CreateFuncaoService";

export class CreateFuncaoController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const service = new CreateFuncaoService();

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
