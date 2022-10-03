import { Request, Response } from "express";
import { UpdateInstituicaoService } from "../../services/instituicao/UpdateInstituicaoService";

export class UpdateInstituicaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, sigla, link, description, padrao } = request.body;

        const service = new UpdateInstituicaoService();

        const result = await service.execute({
            id,
            name,
            sigla,
            link,
            description,
            padrao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
