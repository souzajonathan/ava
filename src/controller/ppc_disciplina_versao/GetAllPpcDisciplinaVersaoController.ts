import { Request, Response } from "express";
import { GetAllPpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/GetAllPpcDisciplinaVersaoService";

export class GetAllPpcDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPpcDisciplinaVersaoService();

        const ppcDisciplinaVersao = await service.execute();

        return response.json(ppcDisciplinaVersao);
    }
}