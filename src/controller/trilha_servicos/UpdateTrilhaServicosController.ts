import { Request, Response } from "express";
import { UpdateTrilhaServicosService } from "../../services/trilha_servicos/UpdateTrilhaServicosService";

export class UpdateTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { nome_trilha, componente_tipo_id } = request.body;

        const service = new UpdateTrilhaServicosService();

        const result = await service.execute({
            id,
            nome_trilha,
            componente_tipo_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
