import { Request, Response } from "express";
import { GetAllServicosTrilhaServicosService } from "../../services/servico_trilha_servicos/GetAllServicosTrilhaServicosService";

export class GetAllServicosTrilhasServicosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllServicosTrilhaServicosService();

        const servicos = await service.execute();

        return response.json(servicos);
    }
}
