import { Request, Response } from "express";
import { GetOneBibliografiaService } from "../../services/bibliografia/GetOneBibliografiaService";

export class GetOneBibliografiaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneBibliografiaService();

        const bibliografia = await service.execute(id);

        return response.json(bibliografia);
    }
}