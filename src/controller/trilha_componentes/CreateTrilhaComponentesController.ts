import { Request, Response } from "express";
import { CreateTrilhaComponentesService } from "../../services/trilha_componentes/CreateTrilhaComponentesService";

export class CreateTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const { nome_versao_trilha, quantidade_creditos, observacoes } =
            request.body;

        const service = new CreateTrilhaComponentesService();

        const result = await service.execute({
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
