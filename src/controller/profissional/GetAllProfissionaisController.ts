import { Request, Response } from "express";
import { GetAllProfissionaisService } from "../../services/profissional/GetAllProfissionaisService";

export class GetAllProfissionaisController {
    async handle(request: Request, response: Response) {
        const service = new GetAllProfissionaisService();

        const profissionais = await service.execute(request.query);

        return response.json(profissionais);
    }
}
