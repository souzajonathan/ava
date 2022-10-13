import { Request, Response } from "express";
import { GetAllEspecificacoesRodadaService } from "../../services/especificacao_rodada/GetAllEspecificacoesRodadaService";

export class GetAllEspecificacacoesRodadaController {
    async handle(request: Request, response: Response) {
        const service = new GetAllEspecificacoesRodadaService();

        const especificacoes = await service.execute(
            request.query?.entidade_id as string,
            request.query?.instituicao_id as string
        );

        return response.json(especificacoes);
    }
}
