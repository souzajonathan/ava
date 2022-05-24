import { Request, Response } from "express";
import { GetOnePpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/GetOnePpcDisciplinaVersaoService";

export class GetOnePpcDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOnePpcDisciplinaVersaoService();

        const ppcDisciplinaVersao = await service.execute(id);

        return response.json(ppcDisciplinaVersao);
    }
}