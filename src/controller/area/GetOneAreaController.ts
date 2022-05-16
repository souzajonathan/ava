import { Request, Response } from "express";
import { GetOneAreaService } from "../../services/area/GetOneAreaService";

export class GetOneAreaController {
    async handle(request: Request, response: Response) {
        const service = new GetOneAreaService();

        const area = await service.execute(request.query?.id as string);

        return response.json(area);
    }
}