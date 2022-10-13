import { Request, Response } from "express";
import { GetOneEspecificacaoRodadaService } from "../../services/especificacao_rodada/GetOneEspecificacaoRodadaService";

export class GetOneEspecificacaoRodadaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneEspecificacaoRodadaService();

        const especificacao = await service.execute(
            id,
            request.query.instituicao_id as string
        );

        if (especificacao instanceof Error) {
            return response.status(400).json(especificacao.message);
        }

        return response.json(especificacao);
    }
}
