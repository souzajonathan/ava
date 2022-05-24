import { Request, Response } from "express";
import { GetOneDisciplinaVersaoService } from "../../services/disciplina_versao/GetOneDisciplinaVersaoService";

export class GetOneDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneDisciplinaVersaoService();

        const versao = await service.execute(id);

        return response.json(versao);
    }
}