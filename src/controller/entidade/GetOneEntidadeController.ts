import { Request, Response } from "express";
import { GetOneEntidadeService } from "../../services/entidade/GetOneEntidadeService";

export class GetOneEntidadeController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneEntidadeService();

        const entidade = await service.execute(
            id,
            request.query.instituicao_id as string
        );

        if (entidade instanceof Error) {
            return response.status(400).json(entidade.message);
        }

        return response.json(entidade);
    }
}
