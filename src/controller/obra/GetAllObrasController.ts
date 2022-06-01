import { Request, Response } from "express";
import { GetAllObrasService } from "../../services/obra/GetAllObrasService";

export class GetAllObrasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllObrasService();

        const obras = await service.execute(request.query);

        return response.json(obras);
    }
}