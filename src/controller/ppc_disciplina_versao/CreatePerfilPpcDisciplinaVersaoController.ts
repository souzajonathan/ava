import { Request, Response } from "express";
import { CreatePerfilPpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/CreatePerfilPpcDisciplinaVersaoService";

export class CreatePerfilPpcDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const { ppcDisciplinaVersao_id } = request.body;
        const { perfil_id } = request.params;

        const service = new CreatePerfilPpcDisciplinaVersaoService();

        const result = await service.execute({
            perfil_id,
            ppcDisciplinaVersao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
