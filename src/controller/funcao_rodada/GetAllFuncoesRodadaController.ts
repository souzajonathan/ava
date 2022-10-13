import { Request, Response } from "express";
import { GetAllFuncoesRodadaService } from "../../services/funcao_rodada/GetAllFuncoesRodadaService";

export class GetAllFuncoesRodadaController {
    async handle(request: Request, response: Response) {
        const service = new GetAllFuncoesRodadaService();

        const funcoes = await service.execute(
            request.query?.instituicao_id as string
        );

        return response.json(funcoes);
    }
}
