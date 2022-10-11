import { Request, Response } from "express";
import { GetAllProfissionalServicoService } from "../../services/profissional_servico/GetAllProfissionalServicoService";

export class GetAllProfissionalServicoController {
    async handle(request: Request, response: Response) {
        const service = new GetAllProfissionalServicoService();

        const profissionalServico = await service.execute();

        return response.json(profissionalServico);
    }
}
