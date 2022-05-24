import { Request, Response } from "express";
import { GetOneDisciplinaService } from "../../services/disciplina/GetOneDisciplinaService";

export class GetOneDisciplinaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneDisciplinaService();

        const disciplina = await service.execute(id);

        return response.json(disciplina);
    }
}