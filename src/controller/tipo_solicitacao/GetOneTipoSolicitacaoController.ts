import { Request, Response } from "express";
import { GetOneTipoSolicitacaoService } from "../../services/tipo_solicitacao/GetOneTipoSolicitacaoService";

export class GetOneTipoSolicitacaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneTipoSolicitacaoService();

        const tipo = await service.execute(id);

        if (tipo instanceof Error) {
            return response.status(400).json(tipo.message);
        }

        return response.json(tipo);
    }
}
