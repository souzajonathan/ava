import { Request, Response } from "express";
import { GetAllFuncoesService } from "../../services/funcao/GetAllFuncoesService";

export class GetAllFuncoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllFuncoesService();

        const funcoes = await service.execute();

        return response.json(funcoes);
    }
}
