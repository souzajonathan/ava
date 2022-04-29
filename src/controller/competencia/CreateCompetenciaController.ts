import { Request, Response } from "express";
import { CreateCompetenciaService } from "../../services/competencia/CreateCompetenciaService";

export class CreateCompetenciaController {
    async handle (request: Request, response: Response) {
        const { ppc_id, competencia, competenciaNumero } = request.body;

        const service = new CreateCompetenciaService();

        const result = await service.execute({
            ppc_id,
            competencia,
            competenciaNumero
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}