import { Request, Response } from "express";
import { GetOneCheckTipoServicoService } from "../../services/check_tipo_servico/GetOneCheckTipoServicoService";

export class GetOneCheckTipoServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneCheckTipoServicoService();

        const check = await service.execute(id);

        if (check instanceof Error) {
            return response.status(400).json(check.message);
        }

        return response.json(check);
    }
}
