import { Request, Response } from "express";
import { UpdateFuncaoService } from "../../services/funcao/UpdateFuncaoService";

export class UpdateFuncaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, descricao } = request.body;

        const service = new UpdateFuncaoService();

        const result = await service.execute({
            id,
            name,
            descricao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
