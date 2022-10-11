import { Request, Response } from "express";
import { CreateUsuarioService } from "../../services/usuario/CreateUsuarioService";

export class CreateUsuarioController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const service = new CreateUsuarioService();

        const result = await service.execute({
            name,
            description,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
