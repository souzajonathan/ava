import { Request, Response } from "express";
import { GetAllUsuariosService } from "../../services/usuario/GetAllUsuariosService";

export class GetAllUsuariosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllUsuariosService();

        const usuarios = await service.execute(request.query);

        return response.json(usuarios);
    }
}
