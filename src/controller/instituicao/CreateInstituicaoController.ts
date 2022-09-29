import { Request, Response } from "express";
import { CreateInstituicaoService } from "../../services/instituicao/CreateInstituicaoService";

export class CreateInstituicaoController {
    async handle(request: Request, response: Response) {
        const { name, sigla, link, inst_default } = request.body;

        const service = new CreateInstituicaoService();

        const result = await service.execute({
            name,
            sigla,
            link,
            inst_default,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
