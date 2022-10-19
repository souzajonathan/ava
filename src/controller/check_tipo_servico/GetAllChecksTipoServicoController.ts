import { Request, Response } from "express";
import { GetAllChecksTipoServicoService } from "../../services/check_tipo_servico/GetAllChecksTipoServicoService";

export class GetAllChecksTipoServicoController {
    async handle(request: Request, response: Response) {
        const service = new GetAllChecksTipoServicoService();

        const checks = await service.execute();

        return response.json(checks);
    }
}
