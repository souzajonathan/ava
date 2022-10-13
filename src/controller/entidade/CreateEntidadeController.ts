import { Request, Response } from "express";
import { CreateEntidadeService } from "../../services/entidade/CreateEntidadeService";

export class CreateEntidadeController {
    async handle(request: Request, response: Response) {
        const {
            name,
            description,
            quantidade_rodadas,
            instituicao_id,
            especificacoes,
            funcoes,
        } = request.body;

        const service = new CreateEntidadeService();

        const result = await service.execute({
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
