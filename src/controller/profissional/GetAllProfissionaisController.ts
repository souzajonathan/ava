import { Request, Response } from "express";
import { GetAllProfissionaisService } from "../../services/profissional/GetAllProfissionaisService";

export class GetAllProfissionaisController {
    async handle(request: Request, response: Response) {
        const service = new GetAllProfissionaisService();

        const profissionais = await service.execute(request.query);

        return response.json(profissionais);
    }

    async handleFuncao(request: Request, response: Response) {
        const service = new GetAllProfissionaisService();
        const { funcao_id } = request.params;

        const profissionais = await service.findByFuncao(funcao_id);

        if (profissionais instanceof Error) {
            return response.status(400).json(profissionais.message);
        }

        return response.json(profissionais);
    }
}
