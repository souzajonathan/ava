import { Request, Response } from "express";
import { DeleteFuncaoTipoService } from "../../services/funcao_tipo/DeleteFuncaoTipoService";

export class DeleteFuncaoTipoController {
    async handle(request: Request, response: Response) {
        const { funcao_id } = request.body;
        const { tipo_id } = request.params;

        const service = new DeleteFuncaoTipoService();

        const result = await service.execute({
            funcao_id,
            tipo_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
