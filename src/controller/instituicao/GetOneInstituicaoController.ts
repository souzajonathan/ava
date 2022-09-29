import { Request, Response } from "express";
import { GetOneInstituicaoService } from "../../services/instituicao/GetOneInstituicaoService";

export class GetOneInstituicaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneInstituicaoService();

        const instituicao = await service.execute(id);

        if (instituicao instanceof Error) {
            return response.status(400).json(instituicao.message);
        }

        return response.json(instituicao);
    }
}
