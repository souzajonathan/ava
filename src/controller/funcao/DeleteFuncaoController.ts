import { Request, Response } from "express";
import { DeleteFuncaoService } from "../../services/funcao/DeleteFuncaoService";

export class DeleteFuncaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteFuncaoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
