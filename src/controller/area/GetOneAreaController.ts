import { Request, Response } from "express";
import { GetOneAreaService } from "../../services/area/GetOneAreaService";

export class GetOneAreaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneAreaService();

        const area = await service.execute(id);

        if(area instanceof Error) {
            return response.status(400).json(area.message);
        }

        return response.json(area);
    }
}