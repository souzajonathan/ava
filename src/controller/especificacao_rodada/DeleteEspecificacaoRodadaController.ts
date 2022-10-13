import { Request, Response } from "express";
import { DeleteEspecificacaoRodadaService } from "../../services/especificacao_rodada/DeleteEspecificacaoRodadaService";

export class DeleteEspecificacaoRodadaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteEspecificacaoRodadaService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
