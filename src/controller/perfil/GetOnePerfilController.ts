import { Request, Response } from "express";
import { GetOnePerfilService } from "../../services/perfil/GetOnePerfilService";

export class GetOnePerfilController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOnePerfilService();

        const perfil = await service.execute(id);

        return response.json(perfil);
    }
}