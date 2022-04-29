import { Request, Response } from "express";
import { GetAllPerfisService } from "../../services/perfil/GetAllPerfisService";

export class GetAllPerfisController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPerfisService();

        const perfis = await service.execute();

        return response.json(perfis);
    }
}