import { Request, Response } from "express";
import { CreateTipoSolicitacaoService } from "../../services/tipo_solicitacao/CreateTipoSolicitacaoService";

export class CreateTipoSolicitacaoController {
    async handle(request: Request, response: Response) {
        const { tipo } = request.body;

        const service = new CreateTipoSolicitacaoService();

        const result = await service.execute({
            tipo,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
