import { Request, Response } from "express";
import { GetAllTiposServicosService } from "../../services/tipo_servico/GetAllTiposServicoService";

export class GetAllTiposServicoController {
    async handle(request: Request, response: Response) {
        const service = new GetAllTiposServicosService();

        const tipos = await service.execute(request.query);

        return response.json(tipos);
    }
}
