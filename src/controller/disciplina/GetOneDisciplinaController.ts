import { Request, Response } from "express";
import { GetOneDisciplinaService } from "../../services/disciplina/GetOneDisciplinaService";

export class GetOneDisciplinaController {
    async handle(request: Request, response: Response) {
        const service = new GetOneDisciplinaService();

        const disciplina = await service.execute(request.query?.id as string);

        return response.json(disciplina);
    }
}