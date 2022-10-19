import { Request, Response } from "express";
import { CreateFuncaoTipoService } from "../../services/funcao_tipo/CreateFuncaoTipoService";

export class CreateFuncaoTipoController {
    async handle(request: Request, response: Response) {
        const { funcao_id } = request.params;
        const { tipo_id } = request.body;

        const service = new CreateFuncaoTipoService();

        const result = await service.execute({
            funcao_id,
            tipo_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
