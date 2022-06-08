import { Request, Response } from "express";
import { DeleteCompetenciaPpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/DeleteCompetenciaPpcDisciplinaVersaoService";

export class DeleteCompetenciaPpcDisciplinaVersaoController {
    async handle (request: Request, response: Response) {
        const { ppcDisciplinaVersao_id } = request.body;
        const { competencia_id } = request.params;

        const service = new DeleteCompetenciaPpcDisciplinaVersaoService();

        const result = await service.execute({
            competencia_id,
            ppcDisciplinaVersao_id
        });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}