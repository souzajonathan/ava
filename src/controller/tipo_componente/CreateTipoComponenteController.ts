import { Request, Response } from "express";
import { CreateTipoComponenteService } from "../../services/tipo_componente/CreateTipoComponenteService";

export class CreateTipoComponenteController {
    async handle(request: Request, response: Response) {
        const { nome, descricao, carga_horaria } = request.body;

        const service = new CreateTipoComponenteService();

        const result = await service.execute({
            nome,
            descricao,
            carga_horaria,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
