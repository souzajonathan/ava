import { Request, Response } from "express";
import { DeleteProfissionalServicoService } from "../../services/profissional_servico/DeleteProfissionalServicoService";

export class DeleteProfissionalServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteProfissionalServicoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
