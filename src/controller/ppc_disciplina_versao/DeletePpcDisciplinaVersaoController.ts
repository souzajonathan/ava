import { Request, Response } from "express";
import { DeletePpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/DeletePpcDisciplinaVersaoService";

export class DeletePpcDisciplinaVersaoController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeletePpcDisciplinaVersaoService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}