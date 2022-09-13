import { Request, Response } from "express";
import { GetOneTrilhaComponentesService } from "../../services/trilha_componentes/GetOneTrilhaComponentesService";

export class GetOneTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneTrilhaComponentesService();

        const trilha = await service.execute(id);

        if (trilha instanceof Error) {
            return response.status(400).json(trilha.message);
        }

        return response.json(trilha);
    }
}
