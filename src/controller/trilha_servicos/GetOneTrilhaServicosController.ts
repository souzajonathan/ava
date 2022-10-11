import { Request, Response } from "express";
import { GetOneTrilhaServicosService } from "../../services/trilha_servicos/GetOneTrilhaServicosService";

export class GetOneTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneTrilhaServicosService();

        const trilha = await service.execute(id);

        if (trilha instanceof Error) {
            return response.status(400).json(trilha.message);
        }

        return response.json(trilha);
    }
}
