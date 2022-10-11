import { Request, Response } from "express";
import { GetAllServicosService } from "../../services/servico/GetAllServicosService";

export class GetAllServicosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllServicosService();

        const servicos = await service.execute();

        return response.json(servicos);
    }
}
