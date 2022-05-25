import { Request, Response } from "express";
import { GetOneCompetenciaService } from "../../services/competencia/GetOneCompetenciaService";

export class GetOneCompetenciaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneCompetenciaService();

        const competencia = await service.execute(id);

        return response.json(competencia);
    }
}