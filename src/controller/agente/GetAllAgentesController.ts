import { Request, Response } from "express";
import { GetAllAgentesService } from "../../services/agente/GetAllAgentesService";

export class GetAllAgentesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllAgentesService();

        const agentes = await service.execute();

        return response.json(agentes);
    }
}
