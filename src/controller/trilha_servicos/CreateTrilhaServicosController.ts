import { Request, Response } from "express";
import { CreateTrilhaServicosService } from "../../services/trilha_servicos/CreateTrilhaServicosService";

export class CreateTrilhaServicosController {
    async handle(request: Request, response: Response) {
        const { nome_trilha, componente_tipo_id } = request.body;

        const service = new CreateTrilhaServicosService();

        const result = await service.execute({
            nome_trilha,
            componente_tipo_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
