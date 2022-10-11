import { Request, Response } from "express";
import { GetOneProfissionalService } from "../../services/profissional/GetOneProfissionalService";

export class GetOneProfissionalController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneProfissionalService();

        const profissional = await service.execute(id);

        if (profissional instanceof Error) {
            return response.status(400).json(profissional.message);
        }

        return response.json(profissional);
    }
}
