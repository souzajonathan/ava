import { Request, Response } from "express";
import { GetOneDisciplinaService } from "../../services/disciplina/GetOneDisciplinaService";

export class GetOneDisciplinaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneDisciplinaService();

        const disciplina = await service.execute(id);

        if(disciplina instanceof Error) {
            return response.status(400).json(disciplina.message);
        }

        return response.json(disciplina);
    }
}