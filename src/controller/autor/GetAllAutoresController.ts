import { Request, Response } from "express";
import { GetAllAutoresService } from "../../services/autor/GetAllAutoresService";

export class GetAllAutoresController {
    async handle(request: Request, response: Response) {
        const service = new GetAllAutoresService();

        const autores = await service.execute(request.query);

        return response.json(autores);
    }
}