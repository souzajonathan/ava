import { Request, Response } from "express";
import { GetOneCursoService } from "../../services/curso/GetOneCursoService";

export class GetOneCursoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneCursoService();

        const curso = await service.execute(
            id,
            request.query.instituicao_id as string
        );

        if (curso instanceof Error) {
            return response.status(400).json(curso.message);
        }

        return response.json(curso);
    }
}
