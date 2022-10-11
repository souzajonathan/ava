import { Request, Response } from "express";
import { UpdateAgenteService } from "../../services/agente/UpdateAgenteService";

export class UpdateAgenteController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { usuario_id, curso_id, funcao_id } = request.body;

        const service = new UpdateAgenteService();

        const result = await service.execute({
            id,
            usuario_id,
            curso_id,
            funcao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
