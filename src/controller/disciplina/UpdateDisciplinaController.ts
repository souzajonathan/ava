import { Request, Response } from "express";
import { UpdateDisciplinaService } from "../../services/disciplina/UpdateDisciplinaService";

export class UpdateDisciplinaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, area_id, sigla, instituicao_id } = request.body;

        const service = new UpdateDisciplinaService();

        const result = await service.execute({
            id,
            name,
            area_id,
            sigla,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
