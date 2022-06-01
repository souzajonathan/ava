import { Request, Response } from "express";
import { CreateObraAutorService } from "../../services/obra_autor/CreateObraAutorService";

export class CreateObraAutorController {
    async handle (request: Request, response: Response) {
        const { autor_id, obra_id, funcao } = request.body;

        const service = new CreateObraAutorService;

        const result = await service.execute({
            autor_id,
            obra_id,
            funcao
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}