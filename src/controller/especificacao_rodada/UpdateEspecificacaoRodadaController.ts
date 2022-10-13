import { Request, Response } from "express";
import { UpdateEspecificacaoRodadaService } from "../../services/especificacao_rodada/UpdateEspecificacaoRodadaService";

export class UpdateEspecificacaoRodadaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            nome_rodada,
            porcentagem_aprovacao,
            numero_rodada,
            entidade_id,
            instituicao_id,
            funcoesRodada,
        } = request.body;

        const service = new UpdateEspecificacaoRodadaService();

        const result = await service.execute({
            id,
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
