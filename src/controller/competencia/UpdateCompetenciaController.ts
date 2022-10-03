import { Request, Response } from "express";
import { UpdateCompetenciaService } from "../../services/competencia/UpdateCompetenciaService";

export class UpdateCompetenciaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { ppc_id, competencia, competenciaNumero, instituicao_id } =
            request.body;

        const service = new UpdateCompetenciaService();

        const result = await service.execute({
            id,
            ppc_id,
            competencia,
            competenciaNumero,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
