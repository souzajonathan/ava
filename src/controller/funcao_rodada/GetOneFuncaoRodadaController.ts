import { Request, Response } from "express";
import { GetOneFuncaoRodadaService } from "../../services/funcao_rodada/GetOneFuncaoRodadaService";

export class GetOneFuncaoRodadaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneFuncaoRodadaService();

        const funcao = await service.execute(
            id,
            request.query.instituicao_id as string
        );

        if (funcao instanceof Error) {
            return response.status(400).json(funcao.message);
        }

        return response.json(funcao);
    }
}
