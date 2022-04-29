import { Request, Response } from "express";
import { GetAllCursosService } from "../../services/curso/GetAllCursosService";

export class GetAllCursosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllCursosService();

        const areas = await service.execute();

        return response.json(areas);
    }
}