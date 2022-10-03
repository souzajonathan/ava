import { Request, Response } from "express";
import { UpdatePpcDisciplinaVersaoService } from "../../services/ppc_disciplina_versao/UpdatePpcDisciplinaVersaoService";

export class UpdatePpcDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            ppc_id,
            disciplina_versao_id,
            semestre,
            modulo,
            competencias_id,
            perfis_id,
            instituicao_id,
        } = request.body;

        const service = new UpdatePpcDisciplinaVersaoService();

        const result = await service.execute({
            id,
            ppc_id,
            disciplina_versao_id,
            semestre,
            modulo,
            competencias_id,
            perfis_id,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
