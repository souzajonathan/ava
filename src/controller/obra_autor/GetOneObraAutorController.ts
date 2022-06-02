import { Request, Response } from "express";
import { GetOneObraAutorService } from "../../services/obra_autor/GetOneObraAutorService";

export class GetOneObraAutorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneObraAutorService();

        const obraAutor = await service.execute(id);

        if(obraAutor instanceof Error) {
            return response.status(400).json(obraAutor.message);
        }

        return response.json(obraAutor);
    }
}