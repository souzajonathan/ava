import { Request, Response } from "express";
import { DeletePerfilPpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/DeletePerfilPpcDisciplinaVersaoService";

export class DeletePerfilPpcDisciplinaVersaoController {
    async handle (request: Request, response: Response) {
        const { perfil_id, ppcDisciplinaVersao_id } = request.params;

        const service = new DeletePerfilPpcDisciplinaVersaoService();

        const result = await service.execute({
            perfil_id,
            ppcDisciplinaVersao_id
        });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}