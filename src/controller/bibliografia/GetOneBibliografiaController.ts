import { Request, Response } from "express";
import { GetOneBibliografiaService } from "../../services/bibliografia/GetOneBibliografiaService";

export class GetOneBibliografiaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneBibliografiaService();

        const bibliografia = await service.execute(id);

        if(bibliografia instanceof Error) {
            return response.status(400).json(bibliografia.message);
        }

        return response.json(bibliografia);
    }
}