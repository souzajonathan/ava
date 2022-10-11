import { Request, Response } from "express";
import { CreateAgenteService } from "../../services/agente/CreateAgenteService";

export class CreateAgenteController {
    async handle(request: Request, response: Response) {
        const { usuario_id, curso_id, funcao_id } = request.body;

        const service = new CreateAgenteService();

        const result = await service.execute({
            usuario_id,
            curso_id,
            funcao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
