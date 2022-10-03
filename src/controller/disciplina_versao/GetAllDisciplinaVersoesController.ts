import { Request, Response } from "express";
import { GetAllDisciplinaVersoesService } from "../../services/disciplina_versao/GetAllDisciplinaVersaoService";

export class GetAllDisciplinaVersoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllDisciplinaVersoesService();

        const versoes = await service.execute(
            request.query,
            request.query?.disciplina_id as string,
            request.query?.instituicao_id as string
        );

        return response.json(versoes);
    }
}
