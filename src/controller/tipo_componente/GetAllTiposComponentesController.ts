import { Request, Response } from "express";
import { GetAllTiposSolicitacaoService } from "../../services/tipo_solicitacao/GetAllTiposSolicitacaoService";

export class GetAllTiposComponentesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllTiposSolicitacaoService();

        const tipos = await service.execute(request.query);

        return response.json(tipos);
    }
}
