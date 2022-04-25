import { Request, Response } from "express";
import { GetAllAreasService } from "../services/GetAllAreasService";

export class GetAllAreasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllAreasService();

        const areas = await service.execute();

        return response.json(areas);
    }
}