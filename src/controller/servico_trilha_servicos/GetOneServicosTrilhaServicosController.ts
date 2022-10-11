import { Request, Response } from "express";
import { GetOneServicoTrilhaServicosService } from "../../services/servico_trilha_servicos/GetOneServicoTrilhaServicosService";

export class GetOneServicoTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneServicoTrilhaServicosService();

        const servico = await service.execute(id);

        if (servico instanceof Error) {
            return response.status(400).json(servico.message);
        }

        return response.json(servico);
    }
}
