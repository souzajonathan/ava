import { Request, Response } from "express";
import { GetOneObraService } from "../../services/obra/GetOneObraService";

export class GetOneObraController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneObraService();

        const obra = await service.execute(id);

        if(obra instanceof Error) {
            return response.status(400).json(obra.message);
        }

        return response.json(obra);
    }
}