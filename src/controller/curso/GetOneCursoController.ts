import { Request, Response } from "express";
import { GetOneCursoService } from "../../services/curso/GetOneCursoService";

export class GetOneCursoController {
    async handle(request: Request, response: Response) {
        const service = new GetOneCursoService();

        const curso = await service.execute(request.query?.id as string);

        return response.json(curso);
    }
}