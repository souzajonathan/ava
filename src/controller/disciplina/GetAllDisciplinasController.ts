import { Request, Response } from "express";
import { GetAllDisciplinasService } from "../../services/disciplina/GetAllDisciplinasService";

export class GetAllDisciplinasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllDisciplinasService();

        const disciplinas = await service.execute(request.query, request.query?.area_id as string);

        return response.json(disciplinas);
    }
}