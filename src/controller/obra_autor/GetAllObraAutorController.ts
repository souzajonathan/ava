import { Request, Response } from "express";
import { GetAllObraAutorService } from "../../services/obra_autor/GetAllObraAutorService";

export class GetAllObraAutorController {
    async handle(request: Request, response: Response) {
        const service = new GetAllObraAutorService();

        const obraAutor = await service.execute(request.query);

        return response.json(obraAutor);
    }
}