import { Request, Response } from "express";
import { GetAllPpcDisciplinaVersoesService } from "../../services/ppc_disciplina_versao/GetAllPpcDisciplinaVersoesService";

export class GetAllPpcDisciplinaVersoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPpcDisciplinaVersoesService();

        const ppcDisciplinaVersoes = await service.execute();

        return response.json(ppcDisciplinaVersoes);
    }
}