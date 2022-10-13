import { Request, Response } from "express";
import { DeleteFuncaoRodadaService } from "../../services/funcao_rodada/DeleteFuncaoRodadaService";

export class DeleteFuncaoRodadaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteFuncaoRodadaService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
