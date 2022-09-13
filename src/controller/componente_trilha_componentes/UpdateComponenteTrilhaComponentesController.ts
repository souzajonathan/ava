import { Request, Response } from "express";
import { UpdateComponenteTrilhaComponentesService } from "../../services/componente_trilha_componente/UpdateComponenteTrilhaComponenteService";

export class UpdateComponenteTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            tipos_componentes_id,
            trilha_componentes_id,
            observacao,
            item_interno,
        } = request.body;

        const service = new UpdateComponenteTrilhaComponentesService();

        const result = await service.execute({
            id,
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
