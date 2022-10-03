import { Request, Response } from "express";
import { UpdateDisciplinaVersaoService } from "../../services/disciplina_versao/UpdateDisciplinaVersaoService";

export class UpdateDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            disciplina_id,
            codigo,
            credito_quantidade,
            ementa,
            observacao,
            em_oferta,
            produzido,
            instituicao_id,
        } = request.body;

        const service = new UpdateDisciplinaVersaoService();

        const result = await service.execute({
            id,
            disciplina_id,
            codigo,
            credito_quantidade,
            ementa,
            observacao,
            em_oferta,
            produzido,
            instituicao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
