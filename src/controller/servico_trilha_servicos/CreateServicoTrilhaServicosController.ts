import { Request, Response } from "express";
import { CreateServicoTrilhaServicosService } from "../../services/servico_trilha_servicos/CreateServicoTrilhaServicosService";

export class CreateServicoTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { tipo_servico_id, trilha_servicos_id, posicao } = request.body;

        const service = new CreateServicoTrilhaServicosService();

        const result = await service.execute({
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
