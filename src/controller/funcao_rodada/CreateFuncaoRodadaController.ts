import { Request, Response } from "express";
import { CreateFuncaoRodadaService } from "../../services/funcao_rodada/CreateFuncaoRodadaService";

export class CreateFuncaoRodadaController {
    async handle(request: Request, response: Response) {
        const {
            peso_voto,
            considerar_relevantes,
            especificacao_id,
            funcao_id,
            instituicao_id,
        } = request.body;

        const service = new CreateFuncaoRodadaService();

        const result = await service.execute({
            peso_voto,
            considerar_relevantes,
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
