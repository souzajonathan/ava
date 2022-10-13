import { Request, Response } from "express";
import { UpdateFuncaoRodadaService } from "../../services/funcao_rodada/UpdateFuncaoRodadaService";

export class UpdateFuncaoRodadaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            peso_voto,
            consideracoes_relevantes,
            especificacao_id,
            funcao_id,
            instituicao_id,
        } = request.body;

        const service = new UpdateFuncaoRodadaService();

        const result = await service.execute({
            id,
            peso_voto,
            consideracoes_relevantes,
            especificacao_id,
            funcao_id,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
