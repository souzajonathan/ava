import { Request, Response } from "express";
import { CreatePpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/CreatePpcDisciplinaVersaoService";

export class CreatePpcDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const {
            ppc_id,
            disciplina_versao_id,
            modulo,
            semestre,
            competencias_id,
            perfis_id,
        } = request.body;

        const service = new CreatePpcDisciplinaVersaoService();

        const result = await service.execute({
            ppc_id,
            disciplina_versao_id,
            modulo,
            semestre,
            competencias_id,
            perfis_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
