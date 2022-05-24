import { Request, Response } from "express";
import { GetOneCursoService } from "../../services/curso/GetOneCursoService";

export class GetOneCursoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneCursoService();

        const curso = await service.execute(id);

        return response.json(curso);
    }
}