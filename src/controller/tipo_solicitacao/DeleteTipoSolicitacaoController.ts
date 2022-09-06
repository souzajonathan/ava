import { Request, Response } from "express";
import { DeleteTipoSolicitacaoService } from "../../services/tipo_solicitacao/DeleteTipoSolicitacaoService";

export class DeleteTipoSolicitacaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteTipoSolicitacaoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
