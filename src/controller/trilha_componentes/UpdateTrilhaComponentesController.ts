import { Request, Response } from "express";
import { UpdateTrilhaComponentesService } from "../../services/trilha_componentes/UpdateTrilhaComponentesServices";

export class UpdateTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { nome_versao_trilha, quantidade_creditos, observacoes } =
            request.body;

        const service = new UpdateTrilhaComponentesService();

        const result = await service.execute({
            id,
            nome_versao_trilha,
            quantidade_creditos,
            observacoes,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
