import { Request, Response } from "express";
import { UpdateServicoTrilhaServicosService } from "../../services/servico_trilha_servicos/UpdateServicoTrilhaServicosService";

export class UpdateServicoTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { tipo_servico_id, trilha_servicos_id, posicao } = request.body;

        const service = new UpdateServicoTrilhaServicosService();

        const result = await service.execute({
            id,
            tipo_servico_id,
            trilha_servicos_id,
            posicao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
