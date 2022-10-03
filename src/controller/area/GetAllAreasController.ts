import { Request, Response } from "express";
import { GetAllAreasService } from "../../services/area/GetAllAreasService";

export class GetAllAreasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllAreasService();

        const areas = await service.execute(
            request.query,
            request.query?.instituicao_id as string
        );

        return response.json(areas);
    }
}
