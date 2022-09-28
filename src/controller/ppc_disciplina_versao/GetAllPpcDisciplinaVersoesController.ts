import { Request, Response } from "express";
import { GetAllPpcDisciplinaVersoesService } from "../../services/ppc_disciplina_versao/GetAllPpcDisciplinaVersoesService";

export class GetAllPpcDisciplinaVersoesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPpcDisciplinaVersoesService();

        const ppcDisciplinaVersoes = await service.execute();

        return response.json(ppcDisciplinaVersoes);
    }

    async handlePerfil(request: Request, response: Response) {
        const service = new GetAllPpcDisciplinaVersoesService();
        const { perfil_id } = request.params;

        const ppcDisciplinaVersoes = await service.findByPerfil(perfil_id);

        return response.json(ppcDisciplinaVersoes);
    }

    async handleCompetencia(request: Request, response: Response) {
        const service = new GetAllPpcDisciplinaVersoesService();
        const { competencia_id } = request.params;

        const ppcDisciplinaVersoes = await service.findByPerfil(competencia_id);

        return response.json(ppcDisciplinaVersoes);
    }
}
