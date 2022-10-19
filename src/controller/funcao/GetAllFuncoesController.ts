import { Request, Response } from "express";
import { GetAllFuncoesService } from "../../services/funcao/GetAllFuncoesService";

export class GetAllFuncoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllFuncoesService();

        const funcoes = await service.execute();

        return response.json(funcoes);
    }

    async handleTipo(request: Request, response: Response) {
        const service = new GetAllFuncoesService();
        const { tipo_id } = request.params;

        const funcoes = await service.findByTipo(tipo_id);

        if (funcoes instanceof Error) {
            return response.status(400).json(funcoes.message);
        }

        return response.json(funcoes);
    }

    async handleProfissional(request: Request, response: Response) {
        const service = new GetAllFuncoesService();
        const { profissional_id } = request.params;

        const funcoes = await service.findByProfissional(profissional_id);

        if (funcoes instanceof Error) {
            return response.status(400).json(funcoes.message);
        }

        return response.json(funcoes);
    }
}
