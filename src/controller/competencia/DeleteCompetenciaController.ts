import { Request, Response } from "express";
import { DeleteCompetenciaService } from "../../services/competencia/DeleteCompetenciaService";

export class DeleteCompetenciaController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteCompetenciaService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}