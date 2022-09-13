import { Request, Response } from "express";
import { GetAllComponentesTrilhasComponentesService } from "../../services/componente_trilha_componente/GetAllComponentesTrilhaComponentesService";

export class GetAllComponentesTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllComponentesTrilhasComponentesService();

        const componentesTrilhaComponentes = await service.execute();

        return response.json(componentesTrilhaComponentes);
    }
}
