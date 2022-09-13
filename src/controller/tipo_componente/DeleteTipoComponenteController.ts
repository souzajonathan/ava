import { Request, Response } from "express";
import { DeleteTipoComponenteService } from "../../services/tipo_componente/DeleteTipoComponenteService";

export class DeleteTipoComponenteController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeleteTipoComponenteService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}
