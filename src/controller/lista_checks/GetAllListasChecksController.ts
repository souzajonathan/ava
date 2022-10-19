import { Request, Response } from "express";
import { GetAllListasChecksService } from "../../services/lista_checks/GetAllListasChecksService";

export class GetAllListasChecksController {
    async handle(request: Request, response: Response) {
        const service = new GetAllListasChecksService();

        const listas = await service.execute();

        return response.json(listas);
    }
}
