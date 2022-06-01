import { Request, Response } from "express";
import { GetOneAutorService } from "../../services/autor/GetOneAutorService";

export class GetOneAutorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneAutorService();

        const autor = await service.execute(id);

        if(autor instanceof Error) {
            return response.status(400).json(autor.message);
        }

        return response.json(autor);
    }
}