import { Request, Response } from "express";
import { GetAllTrilhasComponentesService } from "../../services/trilha_componentes/GetAllTrilhasComponentesService";

export class GetAllTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllTrilhasComponentesService();

        const trilhas = await service.execute(request.query);

        return response.json(trilhas);
    }
}
