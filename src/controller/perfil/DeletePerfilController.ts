import { Request, Response } from "express";
import { DeletePerfilService } from "../../services/perfil/DeletePerfilService";

export class DeletePerfilController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeletePerfilService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}