import { Request, Response } from "express";
import { GetOneAgenteService } from "../../services/agente/GetOneAgenteService";

export class GetOneAgenteController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneAgenteService();

        const agente = await service.execute(id);

        if (agente instanceof Error) {
            return response.status(400).json(agente.message);
        }

        return response.json(agente);
    }
}
