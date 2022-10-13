import { Request, Response } from "express";
import { UpdateEntidadeService } from "../../services/entidade/UpdateEntidadeService";

export class UpdateEntidadeController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            name,
            description,
            quantidade_rodadas,
            instituicao_id,
            especificacoes,
            funcoes,
        } = request.body;

        const service = new UpdateEntidadeService();

        const result = await service.execute({
            id,
            name,
            description,
            quantidade_rodadas,
            instituicao_id,
            especificacoes,
            funcoes,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
