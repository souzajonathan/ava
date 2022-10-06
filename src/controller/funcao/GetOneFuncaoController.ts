import { Request, Response } from "express";
import { GetOneFuncaoService } from "../../services/funcao/GetOneFuncaoService";

export class GetOneFuncaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneFuncaoService();

        const funcao = await service.execute(id);

        if (funcao instanceof Error) {
            return response.status(400).json(funcao.message);
        }

        return response.json(funcao);
    }
}
