import { Request, Response } from "express";
import { DeleteProfissionalFuncaoService } from "../../services/profissional_funcao/DeleteProfissionalFuncaoService";

export class DeleteProfissionalFuncaoController {
    async handle(request: Request, response: Response) {
        const { profissional_id } = request.params;
        const { funcao_id } = request.body;

        const service = new DeleteProfissionalFuncaoService();

        const result = await service.execute({
            profissional_id,
            funcao_id,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
