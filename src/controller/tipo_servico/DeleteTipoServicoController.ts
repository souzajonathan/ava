import { Request, Response } from "express";
import { DeleteTipoServicoService } from "../../services/tipo_servico/DeleteTipoServicoService";

export class DeleteTipoServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteTipoServicoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
