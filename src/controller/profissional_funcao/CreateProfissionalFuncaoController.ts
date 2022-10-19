import { Request, Response } from "express";
import { CreateProfissionalFuncaoService } from "../../services/profissional_funcao/CreateProfissionalFuncaoService";

export class CreateProfissionalFuncaoController {
    async handle(request: Request, response: Response) {
        const { profissional_id } = request.params;
        const { funcao_id } = request.body;

        const service = new CreateProfissionalFuncaoService();

        const result = await service.execute({
            profissional_id,
            funcao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
