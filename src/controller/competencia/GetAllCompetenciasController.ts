import { Request, Response } from "express";
import { GetAllCompetenciasService } from "../../services/competencia/GetAllCompetenciasService";

export class GetAllCompetenciasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllCompetenciasService();

        const competencias = await service.execute(
            request.query?.instituicao_id as string
        );

        return response.json(competencias);
    }
}
