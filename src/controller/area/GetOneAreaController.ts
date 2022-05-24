import { Request, Response } from "express";
import { GetOneAreaService } from "../../services/area/GetOneAreaService";

export class GetOneAreaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneAreaService();

        const area = await service.execute(id);

        return response.json(area);
    }
}