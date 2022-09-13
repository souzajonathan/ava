import { Request, Response } from "express";
import { CreateComponenteTrilhaComponentesService } from "../../services/componente_trilha_componente/CreateComponenteTrilhaComponentesService";

export class CreateComponenteTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const {
            tipos_componentes_id,
            trilha_componentes_id,
            observacao,
            item_interno,
        } = request.body;

        const service = new CreateComponenteTrilhaComponentesService();

        const result = await service.execute({
            tipos_componentes_id,
            trilha_componentes_id,
            observacao,
            item_interno,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
