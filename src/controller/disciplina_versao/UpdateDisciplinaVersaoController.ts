import { Request, Response } from "express";
import { UpdateDisciplinaVersaoService } from "../../services/disciplina_versao/UpdateDisciplinaVersaoService";

export class UpdateDisciplinaVersaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            disciplina_id,
            disciplina_versao_nome,
            sigla,
            codigo,
            credito_quantidade,
            ementa,
            bibliografia_basica,
            comp_bibliografia,
            observacao,
            em_oferta,
            produzido
        } = request.body;

        const service = new UpdateDisciplinaVersaoService();

        const result = await service.execute({
            id,
            disciplina_id,
            disciplina_versao_nome,
            sigla,
            codigo,
            credito_quantidade,
            ementa,
            bibliografia_basica,
            comp_bibliografia,
            observacao,
            em_oferta,
            produzido
        });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}