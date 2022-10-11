import { Request, Response } from "express";
import { GetOneProfissionalServicoService } from "../../services/profissional_servico/GetOneProfissionalServicoService";

export class GetOneProfissionalServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneProfissionalServicoService();

        const profissionalServico = await service.execute(id);

        if (profissionalServico instanceof Error) {
            return response.status(400).json(profissionalServico.message);
        }

        return response.json(profissionalServico);
    }
}
