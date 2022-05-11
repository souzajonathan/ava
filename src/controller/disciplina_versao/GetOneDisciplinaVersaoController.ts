import { Request, Response } from "express";
import { GetOneDisciplinaVersaoService } from "../../services/disciplina_versao/GetOneDisciplinaVersaoService";

export class GetOneDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const service = new GetOneDisciplinaVersaoService();

        const versao = await service.execute(request.query?.id as string);

        return response.json(versao);
    }
}