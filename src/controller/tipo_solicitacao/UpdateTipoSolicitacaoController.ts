import { Request, Response } from "express";
import { UpdateTipoSolicitacaoService } from "../../services/tipo_solicitacao/UpdateTipoSolicitacaoService";

export class UpdateTipoSolicitacaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { tipo } = request.body;

        const service = new UpdateTipoSolicitacaoService();

        const result = await service.execute({ id, tipo });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
