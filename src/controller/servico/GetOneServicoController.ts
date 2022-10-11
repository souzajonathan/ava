import { Request, Response } from "express";
import { GetOneServicoService } from "../../services/servico/GetOneServicoService";

export class GetOneServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneServicoService();

        const servico = await service.execute(id);

        if (servico instanceof Error) {
            return response.status(400).json(servico.message);
        }

        return response.json(servico);
    }
}
