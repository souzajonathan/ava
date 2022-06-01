import { Request, Response } from "express";
import { UpdateObraAutorService } from "../../services/obra_autor/UpdateObraAutorService";

export class UpdateObraAutorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { autor_id, obra_id, funcao } = request.body;

        const service = new UpdateObraAutorService();

        const result = await service.execute({id, autor_id, obra_id, funcao});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}