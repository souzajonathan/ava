import { Request, Response } from "express";
import { UpdateTipoComponenteService } from "../../services/tipo_componente/UpdateTipoComponenteService";

export class UpdateTipoComponenteController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { nome, descricao, carga_horaria } = request.body;

        const service = new UpdateTipoComponenteService();

        const result = await service.execute({
            id,
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
