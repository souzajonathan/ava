import { Request, Response } from "express";
import { GetAllTiposServicosService } from "../../services/tipo_servico/GetAllTiposServicoService";

export class GetAllTiposServicoController {
    async handle(request: Request, response: Response) {
        const service = new GetAllTiposServicosService();

        const tipos = await service.execute(request.query);

        return response.json(tipos);
    }

    async handleFuncao(request: Request, response: Response) {
        const service = new GetAllTiposServicosService();
        const { funcao_id } = request.params;

        const tipos = await service.findByFuncao(funcao_id);

        if (tipos instanceof Error) {
            return response.status(400).json(tipos.message);
        }

        return response.json(tipos);
    }
}
