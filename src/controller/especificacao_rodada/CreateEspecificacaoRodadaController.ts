import { Request, Response } from "express";
import { CreateEspecificacaoRodadaService } from "../../services/especificacao_rodada/CreateEspecificacaoRodadaService";

export class CreateEspecificacaoRodadaController {
    async handle(request: Request, response: Response) {
        const {
            nome_rodada,
            porcentagem_aprovacao,
            numero_rodada,
            entidade_id,
            instituicao_id,
            funcoesRodada,
        } = request.body;

        const service = new CreateEspecificacaoRodadaService();

        const result = await service.execute({
            nome_rodada,
            porcentagem_aprovacao,
            numero_rodada,
            entidade_id,
            instituicao_id,
            funcoesRodada,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
