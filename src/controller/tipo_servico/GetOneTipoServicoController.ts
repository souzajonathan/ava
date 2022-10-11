import { Request, Response } from "express";
import { GetOneTipoServicoService } from "../../services/tipo_servico/GetOneTipoServicoService";

export class GetOneTipoServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneTipoServicoService();

        const tipo = await service.execute(id);

        if (tipo instanceof Error) {
            return response.status(400).json(tipo.message);
        }

        return response.json(tipo);
    }
}
