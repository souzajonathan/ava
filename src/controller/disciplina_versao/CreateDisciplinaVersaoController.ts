import { Request, Response } from "express";
import { CreateDisciplinaVersaoService } from "../../services/disciplina_versao/CreateDisciplinaVersaoService";

export class CreateDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
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

        const service = new CreateDisciplinaVersaoService();

        const result = await service.execute({
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
