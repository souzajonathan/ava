import { Request, Response } from "express";
import { DeleteInstituicaoService } from "../../services/instituicao/DeleteInstituicaoService";

export class DeleteInstituicaoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteInstituicaoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
