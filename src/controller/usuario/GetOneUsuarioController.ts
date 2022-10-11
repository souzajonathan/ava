import { Request, Response } from "express";
import { GetOneUsuarioService } from "../../services/usuario/GetOneUsuarioService";

export class GetOneUsuarioController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneUsuarioService();

        const usuario = await service.execute(id);

        if (usuario instanceof Error) {
            return response.status(400).json(usuario.message);
        }

        return response.json(usuario);
    }
}
