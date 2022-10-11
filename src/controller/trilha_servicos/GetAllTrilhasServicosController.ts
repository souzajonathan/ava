import { Request, Response } from "express";
import { GetAllTrilhasServicosService } from "../../services/trilha_servicos/GetAllTrilhasServicosService";

export class GetAllTrilhasServicosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllTrilhasServicosService();

        const trilhas = await service.execute(request.query);

        return response.json(trilhas);
    }
}
