import { Request, Response } from "express";
import { DeleteDisciplinaVersaoService } from "../../services/disciplina_versao/DeleteDisciplinaVersaoService";

export class DeleteDisciplinaVersaoController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteDisciplinaVersaoService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}