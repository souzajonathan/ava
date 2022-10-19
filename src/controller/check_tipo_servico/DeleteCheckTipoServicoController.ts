import { Request, Response } from "express";
import { DeleteCheckTipoServicoService } from "../../services/check_tipo_servico/DeleteCheckTipoServicoService";

export class DeleteCheckTipoServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteCheckTipoServicoService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
