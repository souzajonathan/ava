import { Request, Response } from "express";
import { GetAllInstituicoesService } from "../../services/instituicao/GetAllInstituicoesService";

export class GetAllInstituicoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllInstituicoesService();

        const instituicoes = await service.execute();

        return response.json(instituicoes);
    }
}
