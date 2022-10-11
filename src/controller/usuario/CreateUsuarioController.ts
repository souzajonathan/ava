import { Request, Response } from "express";
import { CreateUsuarioService } from "../../services/usuario/CreateUsuarioService";

export class CreateUsuarioController {
    async handle(request: Request, response: Response) {
        const {
            name,
            cpf,
            birthday,
            email,
            phone,
            address,
            city,
            state,
            country,
            complement,
        } = request.body;

        const service = new CreateUsuarioService();

        const result = await service.execute({
            name,
            cpf,
            birthday,
            email,
            phone,
            address,
            city,
            state,
            country,
            complement,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
