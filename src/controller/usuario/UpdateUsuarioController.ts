import { Request, Response } from "express";
import { UpdateUsuarioService } from "../../services/usuario/UpdateUsuarioService";

export class UpdateUsuarioController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
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

        const service = new UpdateUsuarioService();

        const result = await service.execute({
            id,
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
