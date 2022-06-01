import { Request, Response } from "express";
import { GetAllBibliografiasService } from "../../services/bibliografia/GetAllBibliografiasService";

export class GetAllBibliografiasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllBibliografiasService();

        const bibliografias = await service.execute();

        return response.json(bibliografias);
    }
}